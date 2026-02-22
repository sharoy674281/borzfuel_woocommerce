import Link from "next/link";

export default function ImageBanner() {
  return (
    <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden bg-neutral-200">
      {/*
        PLACEHOLDER: Bytt ut med et ekte bilde — treningsbilde, grappling, competition.
        Bruk: <Image src="/banner.jpg" alt="..." fill className="object-cover" />
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6">
        <p className="text-white/60 text-[11px] uppercase tracking-[0.3em] mb-3">
          Nyhet
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
          Kreatin Tyggetabletter
        </h2>
        <p className="mt-3 text-white/60 text-sm max-w-sm font-light">
          Enkel og effektiv kreatin du kan ta hvor som helst. Ingen shaker nødvendig.
        </p>
        <Link
          href="/product/creatine-chewing-tablets"
          className="mt-6 self-start px-8 py-3 bg-white text-black text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-300"
        >
          Se produkt
        </Link>
      </div>
    </section>
  );
}
