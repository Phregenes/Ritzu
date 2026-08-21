"use client";

import { useEffect, useRef } from "react";
import { readBands, useAudioApi } from "@/components/audio-provider";

type Variant = "moderna" | "retro" | "camarim" | "clara";

export function AudioScene({ variant }: { variant: Variant }) {
  const { analyserRef, playingRef } = useAudioApi();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const bands = readBands(analyserRef.current, variant === "camarim" ? 18 : 12);
      const live = playingRef.current ? 1 : 0.18;
      const root = wrapRef.current;
      if (!root) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (variant === "moderna") {
        const energy = bands.reduce((a, b) => a + b, 0) / bands.length;
        const wash = root.querySelector("[data-wash]") as HTMLElement | null;
        if (wash) {
          wash.style.background = `radial-gradient(ellipse at 30% 80%, rgba(168,184,200,${0.07 + energy * 0.3 * live}) 0%, transparent 58%)`;
        }
      }

      if (variant === "camarim") {
        const bass = bands[0] ?? 0;
        root.querySelectorAll<HTMLElement>("[data-bulb]").forEach((el, i) => {
          const wave = bands[i % bands.length] ?? 0;
          const on = 0.25 + (0.4 + wave * 0.75 + bass * 0.2) * live;
          el.style.background = `rgba(232, 215, 168, ${on})`;
          el.style.boxShadow = `0 0 ${5 + wave * 16 * live}px rgba(232, 215, 168, ${on})`;
        });
      }

      root.querySelectorAll<HTMLElement>("[data-bar]").forEach((el, i) => {
        const level = bands[i % bands.length] ?? 0;
        const max = variant === "retro" ? 20 : variant === "clara" ? 24 : 32;
        el.style.height = `${4 + level * max * live}px`;
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [analyserRef, playingRef, variant]);

  if (variant === "moderna") {
    return (
      <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-[1]">
        <div data-wash className="absolute inset-0 mix-blend-soft-light" />
        <div className="absolute bottom-8 left-6 flex h-10 items-end gap-[3px] md:left-10">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} data-bar className="w-[2px] bg-cream/45" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "retro") {
    return (
      <div
        ref={wrapRef}
        className="pointer-events-none absolute right-5 top-4 z-20 hidden h-6 items-end gap-[3px] md:flex"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} data-bar className="w-[3px] bg-[#884800]" />
        ))}
      </div>
    );
  }

  if (variant === "camarim") {
    return (
      <div ref={wrapRef} className="flex justify-center gap-2 bg-ink py-2">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            data-bulb
            className="size-2.5 rounded-full bg-[#e8d7a8] md:size-3"
          />
        ))}
      </div>
    );
  }

  return (
    <span ref={wrapRef} className="mt-6 flex h-8 items-end gap-[3px]" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} data-bar className="w-[3px] rounded-full bg-ink/70" />
      ))}
    </span>
  );
}
