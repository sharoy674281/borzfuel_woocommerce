import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frakt & Levering",
  description:
    "Informasjon om frakt, leveringstid og leveringsmetoder hos Borzfuel Nutrition.",
};

export default function FraktLeveringPage() {
  return (
    <div className="bg-white mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-black uppercase tracking-tight mb-12">
        Frakt & Levering
      </h1>

      <div className="space-y-8 text-sm text-neutral-600 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            1. Behandlingstid
          </h2>
          <p>
            Vi pakker og sender ordre innen 1–2 virkedager. I perioder med høyt
            volum kan det ta noe lenger tid.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            2. Leveringsmetoder
          </h2>
          <p>Vi tilbyr levering via Bring/Posten:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Pakke til hentested (standard)</li>
            <li>Pakke i postkassen</li>
            <li>Pakke i postkassen (fra kr 49)</li>
            <li>Gratis frakt ved kjøp over kr 1 000</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            3. Leveringstid
          </h2>
          <p>
            Normal leveringstid etter sending er 2–5 virkedager, avhengig av
            hvor du bor i Norge.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            4. Fraktkostnader
          </h2>
          <p>
            Fraktpriser vises i handlekurven og i kassen før du betaler. Pris
            avhenger av leveringsmetode, ordrestørrelse, og om du kvalifiserer
            for gratis frakt.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            5. Gratis frakt
          </h2>
          <p>
            Gratis frakt dersom beløpet er over kr 1 000. Blir automatisk lagt
            til i kassen.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            6. Adresse og informasjon
          </h2>
          <p>
            Kunden er selv ansvarlig for å oppgi riktig navn, adresse og
            kontaktinformasjon. Ufullstendig eller feil informasjon kan føre til
            forsinkelser eller ekstra kostnader.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            7. Ikke-hentede pakker
          </h2>
          <p>
            Pakker som ikke hentes innen fristen vil bli returnert. Det
            påløper et gebyr på 150–300 kr for frakt tur/retur og
            håndteringskostnader. Ønsker du pakken sendt på nytt, må ny frakt
            betales.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            8. Skadet eller manglende pakke
          </h2>
          <p>
            Kontakt support@borzfuelnutrition.no med ordrenummer og bilder
            dersom pakken er skadet eller mangler.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h2 className="text-base font-semibold text-black mb-3">Kontakt</h2>
          <p>E-post: support@borzfuelnutrition.no</p>
          <p>Telefon: 980 69 142</p>
        </div>
      </div>
    </div>
  );
}
