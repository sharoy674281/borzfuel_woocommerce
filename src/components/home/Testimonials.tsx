const testimonials = [
  {
    name: "Runar",
    text: "Løfter mye vekter som er belastende for leddene, men produktet hjelper nettopp mot dette.",
  },
  {
    name: "Simen",
    text: "Utrolig fornøyd, funket som beskrevet! Merker stor forskjell på restitusjon etter hard trening.",
  },
  {
    name: "Ahmad",
    text: "Bruker kreatin-tablettene før BJJ-trening. Enkleste kreatinet jeg har brukt — bare tygg og gå.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-neutral-50 border-y border-neutral-200">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-[11px] text-neutral-400 uppercase tracking-[0.3em] mb-10">
          Hva kundene sier
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t) => (
            <div key={t.name} className="text-center">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-black text-sm">&#9733;</span>
                ))}
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="mt-4 text-[11px] font-semibold text-black uppercase tracking-[0.2em]">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
