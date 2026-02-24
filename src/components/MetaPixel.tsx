"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getCookieConsent } from "./CookieBanner";

const PIXEL_ID = "1983032115969822";

let pixelInitialized = false;

function getFbq(): ((...args: unknown[]) => void) | null {
  const w = window as unknown as Record<string, unknown>;
  return typeof w.fbq === "function" ? (w.fbq as (...args: unknown[]) => void) : null;
}

function initPixel() {
  if (pixelInitialized) return;
  pixelInitialized = true;

  // Standard Meta Pixel snippet — uses internal queue, so all calls
  // made before the script loads are automatically replayed.
  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  getFbq()!("init", PIXEL_ID);
  getFbq()!("track", "PageView");
}

// Helper to track events from anywhere.
// Retries briefly if pixel isn't ready yet (e.g. on full page loads
// where PixelPurchase useEffect runs before MetaPixel initializes).
export function trackPixelEvent(
  event: string,
  data?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  function send() {
    const fbq = getFbq();
    if (!fbq) return false;
    if (data) {
      fbq("track", event, data);
    } else {
      fbq("track", event);
    }
    return true;
  }

  if (send()) return;

  // Retry a few times in case pixel initializes shortly after
  let attempts = 0;
  const interval = setInterval(() => {
    attempts++;
    if (send() || attempts >= 10) {
      clearInterval(interval);
    }
  }, 500);
}

export default function MetaPixel() {
  const pathname = usePathname();

  const handleConsent = useCallback(() => {
    initPixel();
  }, []);

  useEffect(() => {
    if (getCookieConsent() === "all") {
      initPixel();
    }

    window.addEventListener("cookie-consent-granted", handleConsent);
    return () => window.removeEventListener("cookie-consent-granted", handleConsent);
  }, [handleConsent]);

  // Track PageView on every client-side navigation
  useEffect(() => {
    if (pixelInitialized) {
      getFbq()?.("track", "PageView");
    }
  }, [pathname]);

  return null;
}
