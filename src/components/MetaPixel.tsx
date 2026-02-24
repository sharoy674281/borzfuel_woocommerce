"use client";

import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getCookieConsent } from "./CookieBanner";

const PIXEL_ID = "1983032115969822";

let pixelLoaded = false;
let fbqReady = false;
const pendingEvents: { event: string; data?: Record<string, unknown> }[] = [];

// Helper to track events from anywhere
export function trackPixelEvent(
  event: string,
  data?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  if (fbqReady && (window as unknown as Record<string, unknown>).fbq) {
    const fbq = (window as unknown as Record<string, (...args: unknown[]) => void>).fbq;
    if (data) {
      fbq("track", event, data);
    } else {
      fbq("track", event);
    }
  } else {
    // Queue events until pixel is ready
    pendingEvents.push({ event, data });
  }
}

function flushPendingEvents() {
  if (!fbqReady) return;
  while (pendingEvents.length > 0) {
    const { event, data } = pendingEvents.shift()!;
    trackPixelEvent(event, data);
  }
}

function initPixel() {
  if (pixelLoaded) return;
  pixelLoaded = true;

  // Init fbq queue before script loads
  const n = function (...args: unknown[]) {
    const fn = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[][] };
    fn.callMethod ? fn.callMethod(...args) : fn.queue.push(args);
  };
  Object.assign(n, { push: n, loaded: true, version: "2.0", queue: [] });
  (window as unknown as Record<string, unknown>).fbq = n;
  (window as unknown as Record<string, unknown>)._fbq = n;

  // Load the script
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.onload = () => {
    fbqReady = true;
    flushPendingEvents();
  };
  document.head.appendChild(script);

  // These get queued and execute when script loads
  (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("init", PIXEL_ID);
  (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("track", "PageView");

  fbqReady = true;
  flushPendingEvents();
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

  // Track PageView on every route change
  useEffect(() => {
    if (pixelLoaded && (window as unknown as Record<string, unknown>).fbq) {
      (window as unknown as Record<string, (...args: unknown[]) => void>).fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
