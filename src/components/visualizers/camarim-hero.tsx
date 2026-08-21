"use client";

import { useEffect, useState, type ComponentType } from "react";

let Cached: ComponentType | null = null;

export function CamarimHeroObject() {
  const [ready, setReady] = useState(() => Cached !== null);

  useEffect(() => {
    if (Cached) {
      setReady(true);
      return;
    }
    let cancelled = false;
    void import("@/components/visualizers/camarim-visualizer").then((mod) => {
      Cached = mod.CamarimHeroObject;
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready || !Cached) return null;
  return <Cached />;
}
