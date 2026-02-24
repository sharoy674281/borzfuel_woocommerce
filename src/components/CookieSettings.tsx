"use client";

import { useState, useEffect } from "react";
import { getCookieConsent, resetCookieConsent } from "./CookieBanner";

export default function CookieSettings() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(getCookieConsent());
  }, []);

  if (!consent) {
    return (
      <p className="text-xs text-neutral-400">
        Du har ikke valgt cookie-innstillinger ennå.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-neutral-500">
        Nåværende valg:{" "}
        <span className="font-medium text-black">
          {consent === "all" ? "Alle cookies godtatt" : "Kun nødvendige"}
        </span>
      </p>
      <button
        onClick={resetCookieConsent}
        className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider border border-black text-black hover:bg-neutral-100 transition-colors cursor-pointer"
      >
        Endre
      </button>
    </div>
  );
}
