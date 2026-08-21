import Image from "next/image";
import Link from "next/link";
import { AudioScene } from "@/components/audio-scene";
import { ModernaVizSection } from "@/components/visualizers/sections";
import { VersionBar } from "@/components/version-bar";
import { formatPrice, heroImages, products } from "@/lib/products";

export default function ModernaHome() {
  const featured = products[0];

  return (
    <div className="bg-ink text-cream font-sans pb-24">
      <VersionBar />
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="font-serif text-2xl tracking-[0.2em]">
          RITZU
        </Link>
        <nav className="hidden gap-8 text-[11px] tracking-[0.28em] uppercase md:flex">
          <a href="#colecao">Coleção</a>
          <a href="#marca">A marca</a>
          <a href="#lookbook">Lookbook</a>
        </nav>
        <button className="text-[11px] tracking-[0.28em] uppercase">
          Sacola (0)
        </button>
      </header>

      <section className="relative min-h-[100svh]">
        <Image
          src={heroImages.concert}
          alt="Palco em baixa luz"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <AudioScene variant="moderna" />
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <p className="text-[11px] tracking-[0.4em] text-sky uppercase">
            Dark emotional luxury
          </p>
          <h1 className="mt-4 max-w-5xl font-serif text-6xl leading-[0.9] italic md:text-8xl lg:text-9xl">
            Silenciosamente
            <br />
            perigosa.
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-md text-sm leading-relaxed text-cream/80">
              Botas masculinas de luxo. Alfaiataria londrina, minimalismo
              sombrio japonês e o visual dos rockstars — sem o rock óbvio.
            </p>
            <a
              href="#colecao"
              className="border border-cream/40 px-6 py-3 text-[11px] tracking-[0.3em] uppercase hover:bg-cream hover:text-ink"
            >
              Ver Vol. 1
            </a>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-12">
        <div className="relative min-h-[70vh] md:col-span-7">
          <Image
            src={heroImages.fashion}
            alt="Editorial de moda noturna"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between bg-burgundy px-8 py-12 md:col-span-5 md:px-12 md:py-16">
          <p className="font-serif text-sm tracking-[0.35em] uppercase">
            Manifesto
          </p>
          <div>
            <h2 className="font-serif text-4xl leading-tight italic md:text-5xl">
              Essa é a nossa partitura. A música é sua.
            </h2>
            <p className="mt-6 text-sm leading-7 text-cream/80">
              RITZU honra as mulheres ancestrais que se limitaram — e devolve,
              em fôrma europeia, a liberdade de escolher o que experimentar.
              Estrutura precisa. Força silenciosa.
            </p>
          </div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-sky">
            Beatrice Tanaka · São Paulo
          </p>
        </div>
      </section>

      <ModernaVizSection />

      <section id="colecao" className="px-6 py-20 md:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.35em] text-sky uppercase">
              Coleção
            </p>
            <h2 className="mt-2 font-serif text-5xl italic">Vol. 1</h2>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-5 text-cream/60 md:block">
            Cada faixa do álbum RITZU Vol. 1 corresponde a um calçado.
          </p>
        </div>
        <div className="grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.slug}
              className={`bg-ink ${index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-4 px-4 py-5">
                <div>
                  <p className="text-[10px] tracking-[0.28em] text-stone uppercase">
                    {product.track}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl">{product.name}</h3>
                  <p className="mt-1 text-xs text-cream/55">{product.leather}</p>
                </div>
                <p className="text-sm">{formatPrice(product.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="marca" className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-chocolate px-8 py-16 md:px-16">
          <h2 className="font-serif text-4xl italic md:text-6xl">
            Sofisticação
            <br />e ruína.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-7 text-cream/75">
            A marca vive entre backstage e elegância europeia, silêncio e
            intensidade. Não comunica excesso caricato. Transmite mistério,
            cultura, presença e sensualidade.
          </p>
        </div>
        <div className="relative min-h-[50vh]">
          <Image
            src={heroImages.leather}
            alt="Jaqueta de couro"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section id="lookbook" className="px-6 py-20 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-lg font-serif text-4xl italic md:text-6xl">
            {featured.name} — a faixa de abertura.
          </h2>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-cream/70">
              {featured.last}. Couro que envelhece como um disco tocado demais.
              Para quem carrega a coragem de ser quem é.
            </p>
            <button className="mt-6 bg-cream px-6 py-3 text-[11px] tracking-[0.28em] text-ink uppercase">
              Adicionar · {formatPrice(featured.price)}
            </button>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-cream/15 px-6 py-10 text-[11px] tracking-[0.2em] uppercase text-cream/50 md:flex-row md:justify-between md:px-10">
        <p>RITZU · calçados masculinos de luxo</p>
        <p>Essa é a nossa partitura</p>
      </footer>
    </div>
  );
}
