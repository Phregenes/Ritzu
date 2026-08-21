import Image from "next/image";
import Link from "next/link";
import { VersionBar } from "@/components/version-bar";
import { formatPrice, heroImages, products } from "@/lib/products";

export default function RetroHome() {
  return (
    <div className="retro-dots min-h-screen font-mono pb-28">
      <VersionBar />

      <header className="relative z-10 flex items-center justify-between border-b border-[#1a1a1a] px-5 py-4 md:px-10">
        <p className="text-[10px] tracking-[0.28em] uppercase">
          Index / Vol.01 / 33rpm
        </p>
        <Link href="/" className="font-sans text-lg font-bold tracking-[0.35em]">
          RITZU
        </Link>
        <nav className="flex gap-6 text-[10px] tracking-[0.22em] uppercase">
          <a href="#catalogo" className="text-[#884800]">
            Catálogo
          </a>
          <a href="#specs" className="hover:text-[#884800]">
            Specs
          </a>
          <a href="#marca" className="hover:text-[#884800]">
            Marca
          </a>
        </nav>
      </header>

      <section className="relative overflow-hidden border-b border-[#1a1a1a] px-5 py-14 md:px-10 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
          <span className="retro-scan block h-px w-1/3 bg-[#884800]" />
        </div>
        <p
          className="retro-in text-[10px] tracking-[0.35em] text-[#884800] uppercase"
          style={{ animationDelay: "40ms" }}
        >
          Timeless rockstar · calçado masculino
        </p>
        <div className="mt-6 grid items-end gap-10 md:grid-cols-[1.4fr_0.8fr]">
          <h1
            className="retro-in font-sans text-5xl font-bold leading-[0.9] tracking-tight uppercase md:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            Mechanical
            <br />
            luxury
            <br />
            vol. 1
          </h1>
          <p
            className="retro-in max-w-sm text-xs leading-6 text-[#1a1a1a]/70 md:justify-self-end md:text-right"
            style={{ animationDelay: "220ms" }}
          >
            Partitura em couro. Fôrma europeia, disciplina japonesa, visual de
            rockstar — documentado como um manual técnico, não como um sistema
            operacional.
          </p>
        </div>
        <div
          className="retro-draw mt-8 h-px bg-[#1a1a1a]"
          style={{ animationDelay: "280ms" }}
        />
        <div
          className="retro-in relative mt-10 h-[42vh] min-h-[280px] overflow-hidden border border-[#1a1a1a] md:h-[56vh]"
          style={{ animationDelay: "320ms" }}
        >
          <Image
            src={heroImages.analog}
            alt="Registro analógico da coleção"
            fill
            priority
            className="object-cover grayscale-[20%]"
          />
          <span className="absolute left-0 top-0 border-r border-b border-[#1a1a1a] bg-[#f5f0e1] px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
            Fig. 01 · portra
          </span>
        </div>
      </section>

      <section id="catalogo" className="border-b border-[#1a1a1a] px-5 py-16 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-sans text-5xl font-bold tracking-tight uppercase md:text-6xl">
            Specs
          </h2>
          <p className="max-w-xs text-[11px] leading-5 text-[#1a1a1a]/65">
            Cada faixa do álbum corresponde a um last. Selecione o código e
            reserve o par.
          </p>
        </div>

        <div className="grid border-l border-t border-[#1a1a1a] sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const code = `${index < 3 ? "A" : "B"}${(index % 3) + 1}`;
            return (
              <article
                key={product.slug}
                className="retro-card retro-in border-r border-b border-[#1a1a1a] p-6"
                style={{ animationDelay: `${180 + index * 70}ms` }}
              >
                <p className="flex items-center gap-2.5 font-sans text-lg font-semibold tracking-tight text-[#1a1a1a]">
                  <span className="size-2 shrink-0 rounded-full bg-[#884800]" />
                  <span className="font-mono text-xs font-normal tracking-[0.16em] text-[#884800]">
                    {code}
                  </span>
                  {product.name}
                </p>
                <dl className="mt-6 space-y-0 text-[13px] leading-6 text-[#1a1a1a]">
                  <div className="flex items-baseline justify-between gap-4 border-b border-[#1a1a1a]/20 py-3">
                    <dt className="shrink-0 text-[#5c5348]">Last</dt>
                    <dd className="text-right">{product.last}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-[#1a1a1a]/20 py-3">
                    <dt className="shrink-0 text-[#5c5348]">Material</dt>
                    <dd className="text-right">{product.leather}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="shrink-0 text-[#5c5348]">Index</dt>
                    <dd className="font-medium">{formatPrice(product.price)}</dd>
                  </div>
                </dl>
                <div className="relative mt-2 aspect-[4/3] overflow-hidden bg-[#e8e2d4]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <button className="retro-cta mt-5 w-full py-3 text-xs font-medium tracking-[0.22em] uppercase">
                  Pedir {code}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="specs"
        className="border-b border-[#1a1a1a] bg-[#884800] text-[#f5f0e1]"
      >
        <div
          className="grid md:grid-cols-3"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(26,26,26,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.2) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        >
          {[
            {
              n: "01",
              t: "Arquétipo",
              d: "Rebelde elegante. Mistério, cultura e sensualidade — sem caveira, sem cartaz.",
            },
            {
              n: "02",
              t: "Matéria",
              d: "Couro vivido, fôrma europeia, palmilha em cortiça. Objeto que envelhece.",
            },
            {
              n: "03",
              t: "Escala",
              d: "Ritsu: contenção, vazio que fala, estrutura precisa. A música é sua.",
            },
          ].map((item) => (
            <article
              key={item.n}
              className="relative bg-[#884800] border-[#1a1a1a] p-8 md:border-r md:last:border-r-0"
            >
              <p className="text-[10px] tracking-[0.3em]">{item.n}</p>
              <h3 className="mt-6 font-sans text-3xl font-bold uppercase">
                {item.t}
              </h3>
              <p className="mt-4 max-w-xs text-sm leading-7 text-[#f5f0e1]">
                {item.d}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="marca" className="grid border-b border-[#1a1a1a] md:grid-cols-2">
        <div className="relative min-h-[42vh] border-b border-[#1a1a1a] md:border-b-0 md:border-r">
          <Image
            src={heroImages.interior}
            alt="Interior vintage"
            fill
            className="object-cover grayscale-[30%]"
          />
          <span className="absolute left-0 top-0 border-r border-b border-[#1a1a1a] bg-[#f5f0e1] px-3 py-1 text-[10px] tracking-[0.2em] uppercase">
            Fig. 02 · hotel
          </span>
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:px-12">
          <p className="text-[10px] tracking-[0.3em] text-[#884800] uppercase">
            Obaachan
          </p>
          <h2 className="mt-4 font-sans text-4xl font-bold uppercase leading-tight">
            Ritsu era
            <br />
            o nome.
          </h2>
          <p className="mt-6 max-w-md text-xs leading-6 text-[#1a1a1a]/70">
            Rígida, mas doce. Ensinou estrutura e disciplina — e instigou
            Beatrice a honrar as mulheres que não puderam escolher. A marca
            devolve, em fôrma, a liberdade de experimentar.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-3 px-5 py-8 text-[10px] tracking-[0.22em] uppercase text-[#1a1a1a]/50 md:flex-row md:justify-between md:px-10">
        <p>RITZU · document 001</p>
        <p>Essa é a nossa partitura</p>
      </footer>
    </div>
  );
}
