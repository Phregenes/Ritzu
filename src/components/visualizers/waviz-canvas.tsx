"use client";

import { useEffect, useRef } from "react";
import { AudioAnalyzer, Visualizer, type IOptions } from "waviz";
import { useAudioApi, useGraphReady, usePlaying } from "@/components/audio-provider";

type Props = {
  options: IOptions | IOptions[];
  className?: string;
};

export function WavizCanvas({ options, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visRef = useRef<Visualizer | null>(null);
  const { audioContextRef, sourceNodeRef } = useAudioApi();
  const graphReady = useGraphReady();
  const playing = usePlaying();

  useEffect(() => {
    const canvas = canvasRef.current;
    const audioContext = audioContextRef.current;
    const source = sourceNodeRef.current;
    if (!canvas || !audioContext || !source || !graphReady) return;

    const parent = canvas.parentElement;
    const fit = () => {
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(parent.clientWidth * dpr);
      canvas.height = Math.floor(parent.clientHeight * dpr);
    };
    fit();

    const analyzer = new AudioAnalyzer();
    analyzer.startAnalysis(audioContext, source);
    const visualizer = new Visualizer(canvas, analyzer);
    visRef.current = visualizer;
    visualizer.render(options);

    const onResize = () => fit();
    window.addEventListener("resize", onResize);
    return () => {
      visualizer.stop();
      visRef.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, [audioContextRef, sourceNodeRef, graphReady, options]);

  useEffect(() => {
    const visualizer = visRef.current;
    if (!visualizer || !graphReady) return;
    visualizer.render(options);
  }, [playing, options, graphReady]);

  return <canvas ref={canvasRef} className={className ?? "h-full w-full"} />;
}
