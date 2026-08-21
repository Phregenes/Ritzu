import Image from "next/image";
import Link from "next/link";
import { VersionBar } from "@/components/version-bar";
import { formatPrice, heroImages, products } from "@/lib/products";

export default function CamarimHome() {
  const opening = products[0];

  return (
    <div className="bg-chocolate text-cream font-serif pb-28">
      <VersionBar />

      <div
        className="flex justify-center gap-2 bg-ink py-2"
        aria-hidden="true"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="size-2.5 rounded-full bg-[#e8d7a8] shadow-[0_0_8px_#e8d7a8] md:size-3"
          />
        ))}
      </div>

      <header className="flex items-center justify-between px-6 py-5 md:px-12">
        <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-cream/50">
          Antes do palco
        </p>
        <Link href="/" className="text-2xl tracking-[0.35em]">
          RITZU
        </Link>
        <button className="font-sans text-[10px] tracking-[0.32em] uppercase text-cream/50">
          Sacola
        </button>
      </header>

      <section className="relative min-h-[88svh] overflow-hidden">
        <Image
          src={heroImages.velvet}
          alt="Interior em luz quente"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate via-chocolate/70 to-burgundy/40" />
        <div className="relative flex min-h-[88svh] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
          <p className="font-sans text-[11px] tracking-[0.4em] text-terracotta uppercase">
            Camarim · Vol. 1
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl leading-[0.92] italic md:text-8xl">
            A última
            <br />
            luz acesa.
          </h1>
          <p className="mt-8 max-w-md font-sans text-sm leading-7 text-cream/75">
            RITZU não se mostra na vitrine fria. Ela espera no camarim:
            couro no colo, fôrma europeia, o silêncio antes da música.
          </p>
        </div>
      </section>

      <section className="grid border-y border-cream/10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col justify-between border-b border-cream/10 px-6 py-14 md:border-b-0 md:border-r md:px-12">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-terracotta">
            {opening.track}
          </p>
          <div>
            <h2 className="text-6xl italic md:text-7xl">{opening.name}</h2>
            <p className="mt-4 font-sans text-sm text-cream/60">
              {opening.leather}
            </p>
            <p className="mt-1 font-sans text-sm text-cream/60">{opening.last}</p>
            <p className="mt-8 font-sans text-lg">{formatPrice(opening.price)}</p>
            <button className="mt-8 border border-cream/40 px-8 py-3 font-sans text-[11px] tracking-[0.28em] uppercase hover:bg-cream hover:text-chocolate">
              Reservar este par
            </button>
          </div>
        </div>
        <div className="relative min-h-[60vh]">
          <Image
            src={opening.image}
            alt={opening.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-chocolate/10 mix-blend-multiply" />
        </div>
      </section>

      <section className="px-0 py-16">
        <div className="mb-8 flex items-end justify-between px-6 md:px-12">
          <h2 className="text-4xl italic md:text-5xl">No cabide</h2>
          <p className="hidden font-sans text-[11px] tracking-[0.22em] uppercase text-cream/45 md:block">
            Deslize · cada faixa uma bota
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 md:px-12">
          {products.map((product) => (
            <article
              key={product.slug}
              className="w-[72vw] shrink-0 sm:w-[320px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-3">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.24em] text-terracotta uppercase">
                    {product.track}
                  </p>
                  <h3 className="text-2xl italic">{product.name}</h3>
                </div>
                <p className="font-sans text-xs">{formatPrice(product.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[50vh]">
          <Image
            src={heroImages.lamp}
            alt="Canto íntimo com lâmpada"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-burgundy px-8 py-16 md:px-16">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-cream/50">
            Obaachan
          </p>
          <h2 className="mt-4 text-4xl italic leading-tight md:text-5xl">
            Estrutura rígida.
            <br />
            Doçura por baixo.
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm leading-7 text-cream/75">
            Ritsu ensinou disciplina. Beatrice devolve liberdade: botas para
            quem ousa existir cru, sem o rock de cartaz, sem o luxo óbvio.
            Silenciosamente perigosa — mesmo com a lâmpada ainda acesa.
          </p>
        </div>
      </section>

      <section className="px-6 py-24 text-center md:px-12">
        <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-terracotta">
          A partitura
        </p>
        <blockquote className="mx-auto mt-6 max-w-3xl text-3xl italic leading-tight md:text-5xl">
          “Essa é a nossa partitura, a música é sua.”
        </blockquote>
        <p className="mt-8 font-sans text-sm text-cream/50">
          Beatrice Tanaka · calçados masculinos de luxo
        </p>
      </section>

      <footer className="flex flex-col gap-3 border-t border-cream/10 px-6 py-10 font-sans text-[10px] tracking-[0.22em] uppercase text-cream/40 md:flex-row md:justify-between md:px-12">
        <p>RITZU · camarim particular</p>
        <p>São Paulo</p>
      </footer>
    </div>
  );
}
