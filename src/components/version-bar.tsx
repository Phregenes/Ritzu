"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = [
  { href: "/moderna", label: "Moderna" },
  { href: "/retro", label: "Retrô" },
  { href: "/camarim", label: "Camarim" },
] as const;

export function VersionBar() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Trocar versão da home"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-black/10 bg-[#181818]/90 px-2 py-1.5 text-[11px] tracking-[0.18em] text-[#e0d8d0] shadow-2xl backdrop-blur-md uppercase"
      >
        <Link
          href="/"
          className="rounded-full px-3 py-2 text-[#a8b8c8] hover:text-white"
        >
          Escolher
        </Link>
        {versions.map((version) => {
          const active = pathname === version.href;
          return (
            <Link
              key={version.href}
              href={version.href}
              className={`rounded-full px-3 py-2 ${
                active
                  ? "bg-[#e0d8d0] text-[#181818]"
                  : "hover:bg-white/10 hover:text-white"
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
