import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="grid md:grid-cols-2 min-h-[500px]">
      {/* Left — Image placeholder */}
      <div className="relative bg-neutral-100 min-h-[350px] md:min-h-0">
        {/*
          PLACEHOLDER: Legg til et bilde her.
          Anbefalt: Bilde av utøver, treningslokale, eller produkter i bruk.
          Bruk: <Image src="/brand-story.jpg" alt="..." fill className="object-cover" />
        */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-neutral-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 0 0 1.5-1.5V4.5a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v15a1.5 1.5 0 0 0 1.5 1.5z" />
            </svg>
            <p className="text-xs tracking-wider uppercase">Bilde placeholder</p>
          </div>
        </div>
      </div>

      {/* Right — Text */}
      <div className="flex items-center bg-white px-8 sm:px-14 py-16">
        <div className="max-w-md">
          <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-4">
            Vår historie
          </p>
          <h2 className="text-3xl font-bold text-black uppercase tracking-tight leading-tight mb-6">
            For deg som er
            <br />
            på matta.
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed mb-4">
            BorzFuel ble startet av kampsportutøvere som var lei av generiske
            tilskudd. Vi trengte produkter som faktisk fungerer for de som
            trener hardt og konkurrerer ofte.
          </p>
          <p className="text-neutral-500 text-sm leading-relaxed mb-8">
            &laquo;Borz&raquo; betyr ulv på tsjetsjensk — styrke, utholdenhet
            og viljestyrke. Norskprodusert med GMP-sertifisering.
          </p>
          <Link
            href="/butikk"
            className="inline-block px-8 py-3 bg-black text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
          >
            Se produkter
          </Link>
        </div>
      </div>
    </section>
  );
}
