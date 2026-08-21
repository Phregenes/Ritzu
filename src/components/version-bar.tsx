"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AudioDock } from "@/components/audio-dock";

const versions = [
  { href: "/", label: "Escolher" },
  { href: "/moderna", label: "Moderna" },
  { href: "/retro", label: "Retrô" },
  { href: "/camarim", label: "Camarim" },
  { href: "/clara", label: "Clara" },
] as const;

export function VersionBar() {
  const pathname = usePathname();
  const router = useRouter();
  const current = versions.some((v) => v.href === pathname) ? pathname : "/";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center justify-center gap-2 px-3 md:flex-row">
      <AudioDock />
      <label className="pointer-events-auto relative w-full max-w-[16.5rem] md:hidden">
        <span className="sr-only">Versão da home</span>
        <select
          value={current}
          onChange={(event) => router.push(event.target.value)}
          className="w-full appearance-none rounded-full border border-black/10 bg-[#181818]/95 py-3 pl-4 pr-10 text-xs tracking-[0.14em] text-[#e0d8d0] uppercase outline-none"
        >
          {versions.map((version) => (
            <option key={version.href} value={version.href}>
              {version.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#a8b8c8]"
        >
          ▾
        </span>
      </label>

      <nav
        aria-label="Trocar versão da home"
        className="pointer-events-auto hidden items-center gap-1 rounded-full border border-black/10 bg-[#181818]/90 px-2 py-1.5 text-[11px] tracking-[0.18em] text-[#e0d8d0] uppercase md:flex"
      >
        {versions.map((version) => {
          const active = pathname === version.href;
          return (
            <Link
              key={version.href}
              href={version.href}
              className={`rounded-full px-3 py-2 ${
                active
                  ? "bg-[#e0d8d0] text-[#181818]"
                  : "text-[#a8b8c8] hover:bg-white/10 hover:text-white"
              }`}
            >
              {version.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
