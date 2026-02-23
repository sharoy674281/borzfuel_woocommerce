"use client";

import { useEffect } from "react";
import { getCookieConsent } from "./CookieBanner";

const PIXEL_ID = "1983032115969822";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

function loadPixel() {
  if (window.fbq) return;

  const f = window;
  const b = document;
  const n = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    n.callMethod
      ? n.callMethod.apply(n, args)
      : n.queue.push(args);
  } as unknown as Window["fbq"] & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    loaded: boolean;
    version: string;
    push: (...args: unknown[]) => void;
  };

  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  f.fbq = n;
  f._fbq = n;

  const s = b.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = b.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(s, first);

  window.fbq!("init", PIXEL_ID);
  window.fbq!("track", "PageView");
}

export default function MetaPixel() {
  useEffect(() => {
    // Load if consent already given
    const consent = getCookieConsent();
    if (consent === "all") {
      loadPixel();
    }

    // Listen for future consent
    const handler = () => loadPixel();
    window.addEventListener("cookie-consent-granted", handler);
    return () => window.removeEventListener("cookie-consent-granted", handler);
  }, []);

  return null;
}
