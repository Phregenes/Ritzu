"use client";

import { useEffect, useState, type ComponentType } from "react";
import { WavizCanvas } from "@/components/visualizers/waviz-canvas";
import type { IOptions } from "waviz";

let ModernaCached: ComponentType | null = null;

function ModernaVisualizer() {
  const [ready, setReady] = useState(() => ModernaCached !== null);

  useEffect(() => {
    if (ModernaCached) {
      setReady(true);
      return;
    }
    let cancelled = false;
    void import("@/components/visualizers/moderna-visualizer").then((mod) => {
      ModernaCached = mod.ModernaVisualizer;
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !ModernaCached) return null;
  return <ModernaCached />;
}

const claraOptions: IOptions[] = [
  {
    domain: ["time", 160],
    coord: ["polar", 80],
    viz: ["line"],
    color: ["radialGradient", "#181818", "#a8b8c8"],
    stroke: [1.4],
  },
  {
    domain: ["freq", 80, 220],
    coord: ["polar", 20],
    viz: ["dots", 90],
    color: ["#884800"],
    stroke: [2],
  },
];

const retroOptions: IOptions[] = [
  {
    domain: ["freq", 40, 180],
    viz: ["bars", 42],
    color: ["linearGradient", "#884800", "#181818"],
    stroke: [6],
  },
  {
    domain: ["time", 90],
    viz: ["line"],
    color: ["#1a1a1a"],
    stroke: [1.2],
  },
];

function Stage({
  kicker,
  title,
  note,
  children,
  tone,
}: {
  kicker: string;
  title: string;
  note: string;
  children: React.ReactNode;
  tone: string;
}) {
  return (
    <section id="visual" className={tone}>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-12">
        <p className="text-[11px] tracking-[0.28em] uppercase opacity-70">{kicker}</p>
        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{title}</h2>
        <p className="mt-2 max-w-lg text-sm leading-6 opacity-70">{note}</p>
        <div className="relative mt-6 h-[46vh] min-h-[300px] overflow-hidden">{children}</div>
      </div>
    </section>
  );
}

export function ClaraVizSection() {
  return (
    <Stage
      kicker="Go Outside · waviz"
      title="Onda polar"
      note="Waviz: linha e pontos em coordenadas polares. Clean, sobre o azul da capa."
      tone="bg-white text-ink"
    >
      <WavizCanvas options={claraOptions} />
    </Stage>
  );
}

export function RetroVizSection() {
  return (
    <Stage
      kicker="Go Outside · waviz"
      title="Espectro / 33 RPM"
      note="Waviz: barras de frequência e waveform — leitura de laboratório, não jukebox."
      tone="border-y border-[#1a1a1a] bg-[#f5f0e1] text-[#1a1a1a]"
    >
      <div className="h-full border border-[#1a1a1a] bg-[#fbf7ee]">
        <WavizCanvas options={retroOptions} />
      </div>
    </Stage>
  );
}

export function ModernaVizSection() {
  return (
    <Stage
      kicker="Go Outside · three.js"
      title="Núcleo"
      note="React Three Fiber: sólido distorcido e campo de partículas no escuro."
      tone="bg-ink text-cream"
    >
      <ModernaVisualizer />
    </Stage>
  );
}
