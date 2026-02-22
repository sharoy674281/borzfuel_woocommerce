import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo borzfuel.png"
              alt="BorzFuel"
              width={120}
              height={40}
              className="h-30 w-auto brightness-0 mb-3"
            />
            <p className="text-xs text-neutral-400 leading-relaxed">
              Premium kosttilskudd for kampsportutøvere.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-4">
              Butikk
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs">
              <Link href="/butikk" className="text-neutral-400 hover:text-black transition-colors">
                Alle produkter
              </Link>
              <Link href="/butikk?kategori=styrke" className="text-neutral-400 hover:text-black transition-colors">
                Styrke & Kreatin
              </Link>
              <Link href="/butikk?kategori=ledd-mobilitet" className="text-neutral-400 hover:text-black transition-colors">
                Ledd & Mobilitet
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-4">
              Info
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs">
              <Link href="/vilkar-personvern" className="text-neutral-400 hover:text-black transition-colors">
                Vilkår & Personvern
              </Link>
              <Link href="/frakt-levering" className="text-neutral-400 hover:text-black transition-colors">
                Frakt & Levering
              </Link>
              <Link href="/retur-reklamasjon" className="text-neutral-400 hover:text-black transition-colors">
                Retur & Reklamasjon
              </Link>
              <Link href="/kjopsvilkar" className="text-neutral-400 hover:text-black transition-colors">
                Kjøpsvilkår
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-black uppercase tracking-[0.15em] mb-4">
              Kontakt
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <a href="mailto:support@borzfuelnutrition.no" className="hover:text-black transition-colors">
                support@borzfuelnutrition.no
              </a>
              <a href="tel:+4798069142" className="hover:text-black transition-colors">
                980 69 142
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-10 pt-8 text-center text-[11px] text-neutral-300 uppercase tracking-wider">
          &copy; {new Date().getFullYear()} BorzFuel DA &middot; Org.nr 934 110 374
        </div>
      </div>
    </footer>
  );
}
