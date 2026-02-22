import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retur & Reklamasjon",
  description:
    "Informasjon om angrerett, retur og reklamasjon hos Borzfuel Nutrition.",
};

export default function ReturReklamasjonPage() {
  return (
    <div className="bg-white mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-black uppercase tracking-tight mb-12">
        Retur & Reklamasjon
      </h1>

      <div className="space-y-8 text-sm text-neutral-600 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            1. Angrerett (14 dager)
          </h2>
          <p className="mb-3">
            Som forbruker har du 14 dagers angrerett fra dagen du mottar varen.
            Angreretten gjelder kun dersom produktet er:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Uåpnet</li>
            <li>Ubrukt</li>
            <li>I original forsegling og emballasje</li>
          </ul>
          <p className="mb-3">
            Kosttilskudd som er åpnet eller har brutt forsegling kan ikke
            returneres av hygieniske årsaker.
          </p>
          <p className="font-medium text-black mb-2">
            Slik bruker du angreretten:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              Kontakt oss på support@borzfuelnutrition.no før du sender varen i
              retur.
            </li>
            <li>
              Oppgi ordrenummer og hvilke produkter du ønsker å returnere.
            </li>
            <li>Returner varen innen rimelig tid.</li>
          </ol>
          <p className="mt-3">
            Kunden betaler returfrakt ved bruk av angrerett. Refusjon utbetales
            innen 14 dager etter at vi har mottatt og godkjent varen.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            2. Reklamasjon (feil eller mangler)
          </h2>
          <p className="mb-3">
            Dersom produktet har en mangel, er defekt, eller du har mottatt feil
            vare, kan du reklamere i inntil 2 år i henhold til
            Forbrukerkjøpsloven.
          </p>
          <p className="font-medium text-black mb-2">Eksempler:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Produktet er skadet ved mottak</li>
            <li>Feil produkt ble sendt</li>
            <li>Innholdet samsvarer ikke med beskrivelsen</li>
          </ul>
          <p>
            Send e-post til support@borzfuelnutrition.no med ordrenummer,
            beskrivelse av feilen og bilder av produkt/emballasje. Vi dekker
            returfrakt ved godkjent reklamasjon.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            3. Hvordan returnere en vare
          </h2>
          <p className="mb-2">Adresse for retur:</p>
          <p className="font-medium text-black">
            BorzFuel
            <br />
            Gyldenprisveien 25
            <br />
            5056 Bergen
          </p>
          <p className="mt-3">
            Merk pakken med navn og ordrenummer. Vi anbefaler sporing ved retur.
            Kunden er selv ansvarlig for at pakken kommer frem.
          </p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h2 className="text-base font-semibold text-black mb-3">
            Kontakt oss
          </h2>
          <p>E-post: support@borzfuelnutrition.no</p>
          <p>Telefon: 980 69 142</p>
        </div>
      </div>
    </div>
  );
}
