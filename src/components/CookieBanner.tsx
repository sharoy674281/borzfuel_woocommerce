"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "borzfuel-cookie-consent";

export type CookieConsent = "all" | "necessary" | null;

export function getCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "all" || value === "necessary") return value;
  return null;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = (choice: "all" | "necessary") => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setVisible(false);
    if (choice === "all") {
      window.dispatchEvent(new Event("cookie-consent-granted"));
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-neutral-200 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-xs text-neutral-600 leading-relaxed flex-1">
          Vi bruker informasjonskapsler for å forbedre opplevelsen din, analysere
          trafikk og vise relevant markedsføring.{" "}
          <Link
            href="/vilkar-personvern"
            className="underline hover:text-black"
          >
            Les mer
          </Link>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => handleAccept("necessary")}
            className="px-4 py-2 text-[11px] font-medium uppercase tracking-wider border border-neutral-200 text-neutral-600 hover:border-black hover:text-black transition-colors cursor-pointer"
          >
            Kun nødvendige
          </button>
          <button
            onClick={() => handleAccept("all")}
            className="px-4 py-2 text-[11px] font-medium uppercase tracking-wider bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Godta alle
          </button>
        </div>
      </div>
    </div>
  );
}
