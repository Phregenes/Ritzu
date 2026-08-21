import Image from "next/image";
import { VersionBar } from "@/components/version-bar";
import { formatPrice, heroImages, leatherPrints, products } from "@/lib/products";

export default function ClaraHome() {
  const featured = products[0];

  return (
    <div className="bg-[#eef1f4] text-ink font-sans pb-20">
      <VersionBar />

      <section className="relative min-h-[100svh] bg-sky text-ink">
        <header className="flex items-center justify-between px-5 py-5 text-[10px] tracking-[0.32em] text-white uppercase md:px-8">
          <span>Beatrice Tanaka</span>
          <span>Brand project</span>
        </header>

        <div className="grid min-h-[calc(100svh-7.5rem)] md:grid-cols-[1.35fr_0.9fr]">
          <div className="relative min-h-[52vh] border-y border-white/30 md:border-r md:border-y-0">
            <Image
              src={heroImages.fashion}
              alt="Editorial RITZU — presença e couro"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent p-6 text-white md:p-8">
              <p className="text-[10px] tracking-[0.3em] uppercase">Vol. 1 · lookbook</p>
              <p className="mt-2 font-serif text-3xl md:text-4xl">
                Alfaiataria londrina, olhar de rockstar.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-1 flex-col justify-center px-6 py-10 md:px-10">
              <p className="text-[11px] tracking-[0.32em] text-terracotta uppercase">
                Calçados masculinos de luxo
              </p>
              <h1 className="mt-3 font-serif text-6xl leading-[0.85] tracking-tight md:text-7xl">
                RITZU
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-ink/75">
                Silenciosamente perigosa. Essa é a nossa partitura; a música é
                sua.
              </p>
              <a
                href="#colecao"
                className="mt-8 w-fit bg-ink px-6 py-3 text-[11px] tracking-[0.24em] text-cream uppercase"
              >
                Entrar na loja
              </a>
            </div>
            <div className="grid grid-cols-2 border-t border-white/40">
              <div className="relative min-h-[180px] border-r border-white/40">
                <Image
                  src={products[0].image}
                  alt={products[0].alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[180px]">
                <Image
                  src={heroImages.leather}
                  alt="Couro da coleção"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="materias" className="px-4 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] tracking-[0.3em] text-terracotta uppercase">
              Guideline · texturas
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Estampas de couro</h2>
            <p className="mt-4 text-sm leading-7 text-ink/70">
              O brand book pede matéria: python, croc, listra, verniz gasto.
              A RITZU não é superfície lisa — é couro que já viveu.
            </p>
          </div>

          <div className="grid overflow-hidden border border-sky bg-white sm:grid-cols-2 lg:grid-cols-3">
            {leatherPrints.map((print) => (
              <article
                key={print.slug}
                className={`relative min-h-[240px] border-sky ${
                  print.featured
                    ? "min-h-[320px] sm:col-span-2 sm:row-span-2 sm:min-h-full"
                    : "border-t lg:border-l"
                }`}
              >
                <Image
                  src={print.image}
                  alt={print.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-ink/70 px-5 py-4 text-cream">
                  <p className="font-serif text-2xl">{print.name}</p>
                  <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-cream/80">
                    {print.note}
                  </p>
                </div>
              </article>
            ))}

            <article className="relative min-h-[240px] border-t border-sky lg:border-l">
              <div className="print-croc absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 bg-ink/70 px-5 py-4 text-cream">
                <p className="font-serif text-2xl">Croc</p>
                <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-cream/80">
                  Escama pesada · verde-floresta
                </p>
              </div>
            </article>

            <article className="relative min-h-[240px] border-t border-sky lg:border-l">
              <div className="print-tiger absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 bg-ink/70 px-5 py-4 text-cream">
                <p className="font-serif text-2xl">Tigre</p>
                <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-cream/80">
                  Listra do mood board · azul e burgundy
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="colecao" className="px-4 pb-6 md:px-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden border border-sky bg-white lg:grid-cols-2">
          <div className="relative min-h-[420px] bg-cream lg:min-h-[640px]">
            <Image
              src={featured.image}
              alt={featured.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col justify-center bg-white px-8 py-12 md:px-14">
            <p className="text-[11px] tracking-[0.28em] text-terracotta uppercase">
              {featured.track}
            </p>
            <h2 className="mt-3 font-serif text-5xl md:text-6xl">{featured.name}</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ink/70">
              {featured.last}. {featured.leather}. A faixa de abertura da coleção.
            </p>
            <p className="mt-8 text-lg">{formatPrice(featured.price)}</p>
            <button className="mt-8 w-fit border-b border-ink pb-1 text-[11px] tracking-[0.28em] uppercase">
              Adicionar à sacola
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl">Coleção</h2>
          <p className="text-[11px] tracking-[0.22em] text-stone uppercase">
            Seis formas
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.slug}
              className="flex flex-col overflow-hidden border border-sky bg-white"
            >
              <div className="relative aspect-[3/4] bg-cream">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-sky px-5 py-4">
                <div>
                  <p className="text-[10px] tracking-[0.22em] text-terracotta uppercase">
                    {product.track}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl">{product.name}</h3>
                </div>
                <p className="pt-5 text-sm text-ink/70">{formatPrice(product.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sky px-6 py-24 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] tracking-[0.3em] text-forest uppercase">
            Beatrice Tanaka
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink">Ritsu, a obaachan.</h2>
          <p className="mt-6 text-sm leading-8 text-ink/70">
            Estrutura e disciplina, doçura por baixo. A marca honra as mulheres
            que não puderam escolher — e devolve, em fôrma europeia, a liberdade
            de experimentar. Dark emotional luxury, em voz baixa.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-3 bg-[#eef1f4] px-6 py-8 pb-6 text-[10px] tracking-[0.24em] uppercase text-stone md:flex-row md:justify-between md:px-12">
        <p>RITZU · São Paulo</p>
        <p>Capa · azul da marca</p>
      </footer>
    </div>
  );
}
