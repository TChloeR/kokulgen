"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const GA_ID = "G-HST9ZGX3JS";
const STORAGE_KEY = "kokulgen_cookie_consent";

function subscribeToConsent(cb: () => void) {
  window.addEventListener("cookie-consent-changed", cb);
  return () => window.removeEventListener("cookie-consent-changed", cb);
}

function getConsentSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "granted";
}

function getConsentServerSnapshot() {
  return false;
}

export default function Analytics() {
  const consented = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );

  if (!consented) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}
