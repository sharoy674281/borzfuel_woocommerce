import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kjøpsvilkår",
  description: "Les kjøpsvilkårene for handel hos Borzfuel Nutrition.",
};

export default function KjopsvilkarPage() {
  return (
    <div className="bg-white mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-black uppercase tracking-tight mb-12">
        Kjøpsvilkår
      </h1>

      <div className="space-y-8 text-sm text-neutral-600 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            1. Parter
          </h2>
          <p>
            <strong>Selger:</strong> BorzFuel, Gyldenprisveien 25
          </p>
          <p>E-post: support@borzfuelnutrition.no</p>
          <p>Telefon: 980 69 142</p>
          <p className="mt-2">
            <strong>Kunde:</strong> Den personen som gjennomfører et kjøp i
            nettbutikken.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            2. Bestilling og avtale
          </h2>
          <p>
            En bindende avtale oppstår når du gjennomfører en bestilling og
            mottar ordrebekreftelse. BorzFuel kan kansellere en ordre ved
            åpenbare feil (prisfeil, utsolgte varer, teknisk feil).
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            3. Priser
          </h2>
          <p>
            Alle priser er oppgitt i NOK inkl. mva. Fraktkostnader vises i
            handlekurv/kasse. Vi forbeholder oss retten til å endre priser uten
            forhåndsvarsel.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            4. Betaling
          </h2>
          <p>Vi aksepterer følgende betalingsmetoder:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Vipps</li>
            <li>Kortbetaling</li>
            <li>PayPal (dersom aktivert)</li>
          </ul>
          <p className="mt-2">
            Betaling skjer samtidig med bestillingen. Selger lagrer ikke
            kortinformasjon.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            5. Levering
          </h2>
          <p>
            Ordre sendes innen 1–2 virkedager. Leveringstid er 2–5 virkedager
            via Bring/Posten, avhengig av hvor du bor i Norge.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            6. Angrerett (14 dager)
          </h2>
          <p>
            Produktet må være uåpnet, ubrukt og i original forsegling/emballasje.
            Kunden betaler returfrakt. Varen kan ikke returneres dersom den er
            åpnet, av hygieniske årsaker.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            7. Reklamasjon
          </h2>
          <p>
            2 års reklamasjonsrett i henhold til Forbrukerkjøpsloven.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            8. Ikke-hentede pakker
          </h2>
          <p>
            Gebyr på 150–300 kr for frakt tur/retur og håndtering ved
            ikke-hentede pakker.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            9. Personvern
          </h2>
          <p>
            Vi behandler personopplysninger i tråd med personopplysningsloven og
            GDPR.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            10. Produktinformasjon
          </h2>
          <p>
            Kosttilskudd skal ikke erstatte et variert kosthold. Følg
            anbefalingene på etiketten og kontakt helsepersonell ved spesielle
            helsetilstander eller allergier.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-black mb-3">
            11. Endringer i vilkår
          </h2>
          <p>BorzFuel kan oppdatere vilkårene ved behov.</p>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h2 className="text-base font-semibold text-black mb-3">
            12. Kontaktinformasjon
          </h2>
          <p>BorzFuel Kundeservice</p>
          <p>E-post: support@borzfuelnutrition.no</p>
          <p>Telefon: 980 69 142</p>
        </div>
      </div>
    </div>
  );
}
