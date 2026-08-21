"use client";

import { useEffect, useRef } from "react";
import { readBands, useAudioApi, usePlaying } from "@/components/audio-provider";

export function AudioDock() {
  const { toggle, analyserRef } = useAudioApi();
  const playing = usePlaying();
  const barsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const levels = readBands(analyserRef.current, 5);
      const nodes = barsRef.current?.children;
      if (nodes) {
        levels.forEach((level, i) => {
          const el = nodes[i] as HTMLElement | undefined;
          if (el) el.style.height = `${5 + level * 11}px`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [analyserRef]);

  return (
    <button
      type="button"
      data-audio-dock
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
        toggle();
      }}
      aria-label={playing ? "Pausar Go Outside" : "Tocar Go Outside"}
      className="pointer-events-auto relative z-[60] flex items-center gap-2 rounded-full border border-black/10 bg-[#181818]/95 px-3 py-2 text-[#e0d8d0]"
    >
      <span ref={barsRef} className="flex h-4 items-end gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="w-[2px] rounded-full bg-[#a8b8c8]" />
        ))}
      </span>
      <span className="text-[10px] tracking-[0.16em] uppercase">
        {playing ? "Pausar" : "Play"}
      </span>
    </button>
  );
}
