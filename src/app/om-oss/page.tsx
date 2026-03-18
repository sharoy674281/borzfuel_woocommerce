import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "BorzFuel ble startet av Rakhman Ismailov og Markus Hadebe — to kampsportutøvere fra Bergen som så behovet for kosttilskudd laget spesielt for utøvere.",
  alternates: {
    canonical: "/om-oss",
  },
};

export default function OmOssPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-20">
        <nav className="flex items-center gap-2 text-[11px] text-neutral-400 uppercase tracking-[0.1em] mb-12">
          <Link href="/" className="hover:text-black transition-colors">
            Hjem
          </Link>
          <span>/</span>
          <span className="text-black">Om oss</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-4">
              Vår historie
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight leading-tight mb-8">
              Bygget av utøvere,
              <br />
              for utøvere.
            </h1>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
              <p>
                BorzFuel Nutrition ble grunnlagt av <strong>Rakhman Ismailov</strong> og{" "}
                <strong>Markus Hadebe</strong> — to kampsportutøvere fra Bergen
                som så et tydelig hull i det norske markedet. De fleste
                kosttilskudd i Norge er laget for generelle treningsentusiaster,
                men svært få er utviklet med tanke på de spesifikke behovene til
                kampsportutøvere.
              </p>
              <p>
                Som aktive utøvere vet vi hvor viktig riktig ernæring og
                tilskudd er for prestasjon, restitusjon og langsiktig helse.
                Kampsport er krevende — det sliter på ledd, krever eksplosiv
                styrke, og stiller høye krav til utholdenhet. Vi trengte
                produkter som faktisk adresserer disse utfordringene.
              </p>
              <p>
                Derfor startet vi BorzFuel. Vi ønsket å lage kosttilskudd som vi
                selv ville brukt — med kvalitetsingredienser, riktig dosering,
                og uten unødvendige fyllstoffer. Alle produktene våre er
                GMP-sertifisert og utviklet med fokus på det som faktisk
                fungerer for utøvere som trener hardt og konkurrerer ofte.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
            <Image
              src="https://checkout.borzfuelnutrition.com/wp-content/uploads/2025/11/armin-og-august-scaled.jpg"
              alt="Rakhman Ismailov og Markus Hadebe, grunnleggerne av BorzFuel Nutrition"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-2">
              Hva vi står for
            </p>
            <h2 className="text-2xl font-bold text-black uppercase tracking-tight">
              Våre verdier
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-3">
                Kvalitet først
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Alle produktene våre er GMP-sertifisert. Vi bruker kun
                dokumenterte ingredienser i effektive doser — ingen
                proprietære blandinger, ingen skjulte fyllstoffer.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-3">
                Laget for kampsport
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Vi forstår hva kroppen trenger under hard trening og
                konkurranse. Produktene våre er utviklet spesifikt for
                kampsportutøvere — fra kreatin til leddstøtte.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-3">
                Enkel bruk
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Vi vet at utøvere har det travelt. Derfor lager vi produkter
                som er enkle å ta med seg — som kreatin-tyggetabletter du
                kan ta uten shaker eller vann.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company info */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-lg font-bold text-black uppercase tracking-tight mb-6">
              Selskapsinformasjon
            </h2>
            <div className="space-y-3 text-sm text-neutral-600">
              <p>
                <span className="font-medium text-black">Selskap:</span>{" "}
                Borzfuel DA
              </p>
              <p>
                <span className="font-medium text-black">Org.nr:</span>{" "}
                934 110 374
              </p>
              <p>
                <span className="font-medium text-black">Adresse:</span>{" "}
                Gyldenprisveien 25, 5056 Bergen
              </p>
              <p>
                <span className="font-medium text-black">E-post:</span>{" "}
                <a
                  href="mailto:support@borzfuelnutrition.no"
                  className="underline hover:text-black"
                >
                  support@borzfuelnutrition.no
                </a>
              </p>
              <p>
                <span className="font-medium text-black">Telefon:</span>{" "}
                <a
                  href="tel:+4798069142"
                  className="underline hover:text-black"
                >
                  980 69 142
                </a>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black uppercase tracking-tight mb-6">
              Kontakt oss
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Har du spørsmål om produktene våre, bestillinger, eller
              samarbeid? Vi svarer gjerne. Send oss en e-post eller ring
              oss i åpningstidene.
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
    </div>
  );
}
