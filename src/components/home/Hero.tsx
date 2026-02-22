import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] max-h-[950px] overflow-hidden bg-black">
      {/*
        PLACEHOLDER: Bytt ut denne diven med et ekte bilde.
        Anbefalt: Competition-bilde, treningsbilde, eller lifestyle-shot.
        Bruk: <Image src="/hero.jpg" alt="..." fill className="object-cover" priority />
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h60v60H0z\' fill=\'none\'/%3E%3Cpath d=\'M30 0v60M0 30h60\' stroke=\'%23fff\' stroke-width=\'.5\'/%3E%3C/svg%3E")', backgroundSize: '60px 60px'}} />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-20">
        <p className="text-white/60 text-[11px] sm:text-xs uppercase tracking-[0.4em] mb-4 font-light">
          For Fighters, By Fighters
        </p>
        <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold text-white uppercase tracking-tight leading-[0.95]">
          Kreatin
          <br />
          Tyggetabletter
        </h1>
        <p className="mt-5 text-white/50 text-sm max-w-md font-light">
          Enkleste kreatinet du har prøvd. Norskprodusert for kampsportutøvere.
        </p>
        <Link
          href="/product/creatine-chewing-tablets"
          className="mt-8 px-10 py-3.5 border border-white/80 text-white text-[11px] font-medium uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-300"
        >
          Handle nå
        </Link>
      </div>
    </section>
  );
}
