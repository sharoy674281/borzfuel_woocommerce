import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] max-h-[950px] overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/havoc bjoroy.mp4" type="video/mp4" />
        <source src="/havoc bjoroy.mov" type="video/quicktime" />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

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
