"use client";

import { useEffect, useCallback } from "react";
import { getCookieConsent } from "./CookieBanner";

const PIXEL_ID = "1983032115969822";

// Helper to track events from anywhere
export function trackPixelEvent(
  event: string,
  data?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
    const fbq = (window as unknown as Record<string, (...args: unknown[]) => void>).fbq;
    if (data) {
      fbq("track", event, data);
    } else {
      fbq("track", event);
    }
  }
}

function initPixel() {
  if ((window as unknown as Record<string, unknown>).fbq) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Init fbq before script loads (queues commands)
  const n = function (...args: unknown[]) {
    (n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] }).callMethod
      ? (n as unknown as { callMethod: (...a: unknown[]) => void }).callMethod(...args)
      : (n as unknown as { queue: unknown[][] }).queue.push(args);
  };
  Object.assign(n, { push: n, loaded: true, version: "2.0", queue: [] });
  (window as unknown as Record<string, unknown>).fbq = n;
  (window as unknown as Record<string, unknown>)._fbq = n;

  (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("init", PIXEL_ID);
  (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("track", "PageView");

  // Also add noscript pixel
  const img = document.createElement("img");
  img.height = 1;
  img.width = 1;
  img.style.display = "none";
  img.src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`;
  document.body.appendChild(img);
}

export default function MetaPixel() {
  const handleConsent = useCallback(() => {
    initPixel();
  }, []);

  useEffect(() => {
    // Load immediately if consent already given
    if (getCookieConsent() === "all") {
      initPixel();
    }

    // Listen for future consent
    window.addEventListener("cookie-consent-granted", handleConsent);
    return () => window.removeEventListener("cookie-consent-granted", handleConsent);
  }, [handleConsent]);

  return null;
}
