import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vilkår & Personvern",
  description:
    "Les om brukervilkår, personvern og informasjonskapsler hos Borzfuel Nutrition.",
};

export default function VilkarPersonvernPage() {
  return (
    <div className="bg-white mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-black uppercase tracking-tight mb-12">
        Vilkår & Personvern
      </h1>

      {/* Brukervilkår */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-black uppercase tracking-tight mb-6">
          Brukervilkår
        </h2>

        <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
          <div>
            <h3 className="font-semibold text-black mb-2">
              1. Bruk av nettstedet
            </h3>
            <p>
              Dette nettstedet er kun for personlig, ikke-kommersiell bruk. Du
              forplikter deg til å ikke misbruke nettsiden, forsøke å hacke
              systemer, manipulere priser, eller bruke innhold uten skriftlig
              godkjenning.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              2. Produktinformasjon
            </h3>
            <p>
              Vi tilstreber å gi så nøyaktig informasjon som mulig. Likevel kan
              skrivefeil, prisendringer eller oppdatert produktinformasjon
              forekomme.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">3. Ansvar</h3>
            <p>
              Kosttilskudd skal ikke erstatte et variert kosthold. Vi tar ikke
              ansvar for feil bruk av produktene. Kontakt helsepersonell ved
              spørsmål om allergier, medisiner eller spesielle helsetilstander.
            </p>
          </div>
        </div>
      </section>

      {/* Personvern */}
      <section>
        <h2 className="text-lg font-bold text-black uppercase tracking-tight mb-6">
          Personvern & Informasjonskapsler (Cookies)
        </h2>

        <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
          <div>
            <h3 className="font-semibold text-black mb-2">
              1. Hvilke data vi samler inn
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Navn og kontaktinformasjon</li>
              <li>
                Leveringsadresse og betalingsdetaljer (betaling behandles av
                tredjepart, ikke lagret hos oss)
              </li>
              <li>Ordrehistorikk</li>
              <li>Teknisk data som IP-adresse, enhet og nettleser</li>
              <li>
                Informasjonskapsler (cookies) for å forbedre brukeropplevelsen
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              2. Hvordan vi bruker dataene dine
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Behandle og sende bestillinger</li>
              <li>Gi kundestøtte</li>
              <li>Administrere brukerkontoen din</li>
              <li>Forbedre nettstedet</li>
              <li>
                Sende varsler om ordre, tilbud eller nyheter (hvis du samtykker)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              3. Informasjonskapsler
            </h3>
            <p>Vi bruker informasjonskapsler for:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Å huske handlekurv og innlogging</li>
              <li>Analytikk (Google Analytics el.l.)</li>
              <li>Markedsføring (f.eks. Meta Pixel hvis aktivert)</li>
            </ul>
            <p className="mt-2">
              Du kan når som helst slette cookies i nettleseren din.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">4. Lagringstid</h3>
            <p>
              Vi lagrer personopplysninger så lenge det er nødvendig for
              lovpålagte krav (regnskap, kjøpshistorikk) eller for å levere
              tjenester du har bedt om.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              5. Deling av data
            </h3>
            <p>Data deles kun med:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Betalingsløsninger (f.eks. Vipps, Klarna, PayPal)</li>
              <li>Logistikkpartnere (for å levere pakken din)</li>
              <li>Tekniske tjenesteleverandører (sikkerhet, drift, analyse)</li>
            </ul>
            <p className="mt-2">
              Data deles aldri med uvedkommende eller selges videre.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              6. Dine rettigheter
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Få innsyn i hvilke data vi har om deg</li>
              <li>Få slettet eller endret data</li>
              <li>Trekke tilbake samtykker</li>
              <li>
                Klage til Datatilsynet om du mener at personvernet ditt brytes
              </li>
            </ul>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <h3 className="font-semibold text-black mb-2">Kontakt</h3>
            <p>E-post: support@borzfuelnutrition.no</p>
            <p>Telefon: 980 69 142</p>
            <p>Adresse: Gyldenprisveien 25</p>
          </div>
        </div>
      </section>
    </div>
  );
}
