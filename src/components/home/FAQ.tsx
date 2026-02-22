"use client";

import { useState } from "react";

const faqs = [
  { q: "Hva er leveringstiden?", a: "Levering tar vanligvis 3-7 virkedager avhengig av fraktmetode." },
  { q: "Er det gratis frakt?", a: "Gratis frakt på bestillinger over kr 1 000. Under dette koster frakt fra kr 49 for pakke i postkassen og kr 179 for hentested." },
  { q: "Kan jeg returnere produkter?", a: "Ja, du har 14 dagers angrerett i henhold til norsk lov." },
  { q: "Er produktene GMP-sertifisert?", a: "Ja, produktene våre er produsert med GMP-sertifisering og streng kvalitetskontroll." },
  { q: "Hvordan bruker jeg kreatin-tyggetablettene?", a: "Tygg 2 tabletter daglig. Kan tas når som helst — før eller etter trening, eller mellom måltider." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h2 className="text-center text-2xl font-bold text-black uppercase tracking-tight mb-14">
        FAQ
      </h2>
      <div className="divide-y divide-neutral-200">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex items-center justify-between w-full py-5 text-left cursor-pointer group"
            >
              <span className="text-sm text-black">{faq.q}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {open === i && (
              <p className="pb-5 text-sm text-neutral-500 leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
