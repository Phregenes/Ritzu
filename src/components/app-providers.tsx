"use client";

import { AudioProvider } from "@/components/audio-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}
