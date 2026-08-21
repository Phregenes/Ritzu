"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";

type AudioApi = {
  toggle: () => void;
  analyserRef: RefObject<AnalyserNode | null>;
  audioRef: RefObject<HTMLAudioElement | null>;
  audioContextRef: RefObject<AudioContext | null>;
  sourceNodeRef: RefObject<MediaElementAudioSourceNode | null>;
  playingRef: RefObject<boolean>;
};

const AudioApiContext = createContext<AudioApi | null>(null);

const playingRef = { current: false };
const analyserRef = { current: null as AnalyserNode | null };
const audioRef = { current: null as HTMLAudioElement | null };
const ctxRef = { current: null as AudioContext | null };
const sourceNodeRef = { current: null as MediaElementAudioSourceNode | null };

let audible = false;
let graphReadyFlag = false;
let userPaused = false;
let playInFlight: Promise<void> | null = null;
let playGen = 0;
let booted = false;

const playingListeners = new Set<() => void>();
const graphReadyListeners = new Set<() => void>();

function emitPlaying() {
  const audio = audioRef.current;
  const nextPlaying = !!audio && !audio.paused;
  const nextAudible = nextPlaying && !audio.muted;
  playingRef.current = nextPlaying;
  if (audible === nextAudible) return;
  audible = nextAudible;
  playingListeners.forEach((listener) => listener());
}

function emitGraphReady() {
  if (graphReadyFlag) return;
  graphReadyFlag = true;
  graphReadyListeners.forEach((listener) => listener());
}

export function usePlaying() {
  return useSyncExternalStore(
    (listener) => {
      playingListeners.add(listener);
      return () => {
        playingListeners.delete(listener);
      };
    },
    () => audible,
    () => false,
  );
}

export function useGraphReady() {
  return useSyncExternalStore(
    (listener) => {
      graphReadyListeners.add(listener);
      return () => {
        graphReadyListeners.delete(listener);
      };
    },
    () => graphReadyFlag,
    () => false,
  );
}

export function useAudioApi() {
  const value = useContext(AudioApiContext);
  if (!value) {
    throw new Error("useAudioApi must be used within AudioProvider");
  }
  return value;
}

const bandCache = new WeakMap<AnalyserNode, Uint8Array>();

export function readBands(analyser: AnalyserNode | null, count = 12) {
  if (!analyser) return Array(count).fill(0.06);
  let data = bandCache.get(analyser);
  if (!data || data.length !== analyser.frequencyBinCount) {
    data = new Uint8Array(analyser.frequencyBinCount);
    bandCache.set(analyser, data);
  }
  analyser.getByteFrequencyData(data);
  const avg = (from: number, to: number) => {
    let sum = 0;
    for (let i = from; i < to; i += 1) sum += data[i];
    return sum / Math.max(1, to - from) / 255;
  };
  return Array.from({ length: count }, (_, i) => {
    const start = Math.floor((i / count) * data.length * 0.55);
    const end = Math.floor(((i + 1) / count) * data.length * 0.55);
    return avg(start, end);
  });
}

function getAudio() {
  if (typeof window === "undefined") return null;
  if (audioRef.current) return audioRef.current;
  const audio = new Audio("/audio/go-outside.m4a");
  audio.loop = true;
  audio.preload = "auto";
  audio.crossOrigin = "anonymous";
  audio.playsInline = true;
  audio.setAttribute("playsinline", "true");
  audio.setAttribute("webkit-playsinline", "true");
  audioRef.current = audio;
  return audio;
}

function attachGraph(audio: HTMLAudioElement) {
  if (ctxRef.current && sourceNodeRef.current && analyserRef.current) {
    return ctxRef.current;
  }
  const AudioCtx =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  const ctx = new AudioCtx();
  const source = ctx.createMediaElementSource(audio);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.82;
  source.connect(analyser);
  analyser.connect(ctx.destination);
  ctxRef.current = ctx;
  sourceNodeRef.current = source;
  analyserRef.current = analyser;
  emitGraphReady();
  return ctx;
}

async function playNow(preferSound: boolean) {
  if (userPaused) return;
  const audio = getAudio();
  if (!audio) return;
  const gen = ++playGen;

  playInFlight = (async () => {
    try {
      const ctx = attachGraph(audio);
      if (userPaused || gen !== playGen) return;
      if (ctx.state === "suspended") await ctx.resume();
      if (userPaused || gen !== playGen) return;
      audio.volume = 1;
      if (preferSound) {
        audio.muted = false;
        try {
          await audio.play();
          if (userPaused || gen !== playGen) {
            if (userPaused) audio.pause();
            emitPlaying();
            return;
          }
          emitPlaying();
          return;
        } catch {
          /* fall through to muted autoplay so visualizers stay alive */
        }
      }
      if (userPaused || gen !== playGen) return;
      audio.muted = true;
      await audio.play();
      if (userPaused || gen !== playGen) {
        if (userPaused) audio.pause();
        emitPlaying();
        return;
      }
      audio.muted = false;
      emitPlaying();
    } catch {
      emitPlaying();
    }
  })().finally(() => {
    if (gen === playGen) playInFlight = null;
  });

  return playInFlight;
}

function unlock(event: Event) {
  if (userPaused) return;
  if (event.target instanceof Element && event.target.closest("[data-audio-dock]")) {
    return;
  }
  const audio = getAudio();
  if (!audio) return;
  audio.muted = false;
  void playNow(true);
}

function toggle() {
  const audio = getAudio();
  if (!audio) return;
  if (!audio.paused && !audio.muted) {
    userPaused = true;
    playGen += 1;
    audio.pause();
    emitPlaying();
    return;
  }
  userPaused = false;
  audio.muted = false;
  void playNow(true);
}

function boot() {
  if (booted || typeof window === "undefined") return;
  booted = true;
  const audio = getAudio();
  if (!audio) return;
  attachGraph(audio);

  const sync = () => emitPlaying();
  audio.addEventListener("playing", sync);
  audio.addEventListener("pause", () => {
    if (userPaused) emitPlaying();
  });
  audio.addEventListener("canplay", () => {
    void playNow(true);
  });

  void playNow(true);

  window.addEventListener("pointerdown", unlock, { capture: true });
  window.addEventListener("touchstart", unlock, { capture: true });
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const api = useMemo<AudioApi>(
    () => ({
      toggle,
      analyserRef,
      audioRef,
      audioContextRef: ctxRef,
      sourceNodeRef,
      playingRef,
    }),
    [],
  );

  useEffect(() => {
    boot();
    void playNow(true);
  }, []);

  return (
    <AudioApiContext.Provider value={api}>{children}</AudioApiContext.Provider>
  );
}

if (typeof window !== "undefined") {
  boot();
}
