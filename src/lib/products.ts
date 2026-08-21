export type Product = {
  id: string;
  slug: string;
  name: string;
  track: string;
  price: number;
  leather: string;
  last: string;
  image: string;
  alt: string;
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const products: Product[] = [
  {
    id: "01",
    slug: "ritsu",
    name: "Ritsu",
    track: "Faixa 01",
    price: 3480,
    leather: "Box calf preto, brilho baixo",
    last: "Fôrma europeia alongada",
    image:
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1400&q=80",
    alt: "Bota chelsea preta de couro",
  },
  {
    id: "02",
    slug: "obaachan",
    name: "Obaachan",
    track: "Faixa 02",
    price: 3680,
    leather: "Couro vachetta caramelo",
    last: "Cano médio, palmilha em cortiça",
    image:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1400&q=80",
    alt: "Bota chelsea marrom clara",
  },
  {
    id: "03",
    slug: "camarim",
    name: "Camarim",
    track: "Faixa 03",
    price: 4120,
    leather: "Couro anilina burgundy",
    last: "Salto bloco 40mm",
    image:
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=1400&q=80",
    alt: "Bota marrom de couro envelhecido",
  },
  {
    id: "04",
    slug: "backstage",
    name: "Backstage",
    track: "Faixa 04",
    price: 3890,
    leather: "Suede florestal",
    last: "Chelsea com elástico invisível",
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1400&q=80",
    alt: "Par de botas de couro sobre pedra",
  },
  {
    id: "05",
    slug: "london-last",
    name: "London Last",
    track: "Faixa 05",
    price: 4280,
    leather: "Couro de bezerro preto",
    last: "Alfaiataria londrina, bico fino",
    image: "/products/london-last.jpg",
    alt: "Bota de couro preta no tornozelo"
  },
  {
    id: "06",
    slug: "silent-fire",
    name: "Silent Fire",
    track: "Faixa 06",
    price: 3980,
    leather: "Couro pull-up terracota",
    last: "Western contemporâneo",
    image:
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1400&q=80",
    alt: "Botas western de couro",
  },
];

export const heroImages = {
  concert:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2000&q=80",
  fashion:
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80",
  leather:
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=1600&q=80",
  analog:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
  interior:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  velvet:
    "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=1600&q=80",
  lamp:
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80",
};
