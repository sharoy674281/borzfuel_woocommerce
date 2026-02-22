"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-[11px] text-white/40 uppercase tracking-[0.3em] mb-3">
          Nyhetsbrev
        </p>
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-3">
          Hold deg oppdatert
        </h2>
        <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto font-light">
          Meld deg på for tilbud og nye produkter.
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Din e-postadresse"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50"
          />
          <button
            type="button"
            className="px-8 py-3 bg-white text-black text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
