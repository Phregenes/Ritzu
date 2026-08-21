import Link from "next/link";
import { AudioDock } from "@/components/audio-dock";

const paths = [
  {
    href: "/moderna",
    kicker: "01",
    title: "Moderna",
    subtitle: "Editorial · estilosa",
    copy: "Tensão fashion, grid assimétrico, noite e couro. Saint Laurent cruza Ann Demeulemeester — silenciosamente perigosa.",
    tone: "bg-ink text-cream",
    accent: "text-sky",
  },
  {
    href: "/retro",
    kicker: "02",
    title: "Retrô",
    subtitle: "Vol. 1 · analog",
    copy: "Camarim, filme, hotel vintage e rockstar atemporal. A coleção como um álbum: cada bota é uma faixa.",
    tone: "bg-burgundy text-cream",
    accent: "text-terracotta",
  },
  {
    href: "/camarim",
    kicker: "03",
    title: "Camarim",
    subtitle: "Íntima · noturna",
    copy: "A hora antes do palco: luz baixa, espelho, couro no colo. Luxo emocional sem vitrine de tecnologia.",
    tone: "bg-chocolate text-cream",
    accent: "text-terracotta",
  },
  {
    href: "/clara",
    kicker: "04",
    title: "Clara",
    subtitle: "Capa · azul",
    copy: "O azul da primeira página do brand book. Ar, wordmark, creme e terracota só no detalhe.",
    tone: "bg-sky text-ink",
    accent: "text-white",
  },
] as const;

export default function ChooserPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <p className="font-sans text-[11px] tracking-[0.35em] uppercase">
          Beatrice Tanaka
        </p>
        <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-stone">
          Brand project · e-commerce
        </p>
        <AudioDock />
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-8 md:px-12 md:pt-16">
        <p className="font-sans text-[11px] tracking-[0.4em] text-stone uppercase">
          Calçados masculinos de luxo
        </p>
        <h1 className="mt-4 font-serif text-[18vw] leading-[0.8] tracking-tight md:text-[9rem]">
          RITZU
        </h1>
        <p className="mt-8 max-w-xl font-sans text-lg leading-relaxed text-ink/80 md:text-xl">
          Quatro versões de home para a dona da marca escolher o caminho.
          Todas partem do mesmo DNA: mistério, cultura, presença — e botas
          feitas para quem existe com autenticidade.
        </p>
      </section>

      <section className="grid min-h-[52vh] sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((path) => (
          <Link
            key={path.href}
            href={path.href}
            className={`group flex flex-col justify-between p-8 transition md:p-10 ${path.tone} hover:brightness-[1.04]`}
          >
            <div>
              <p className={`font-mono text-xs tracking-[0.3em] ${path.accent}`}>
                {path.kicker}
              </p>
              <h2 className="mt-6 font-serif text-5xl leading-none md:text-6xl">
                {path.title}
              </h2>
              <p className="mt-3 font-sans text-sm tracking-[0.22em] uppercase opacity-70">
                {path.subtitle}
              </p>
            </div>
            <div className="mt-12">
              <p className="max-w-sm font-sans text-sm leading-relaxed opacity-85">
                {path.copy}
              </p>
              <span className="mt-8 inline-block font-sans text-[11px] tracking-[0.28em] uppercase underline decoration-1 underline-offset-8">
                Abrir esta home
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
