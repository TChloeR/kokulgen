"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "kokulgen_cookie_consent";

export function getCookieConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === "granted" || val === "denied") return val;
  return null;
}

function subscribeToConsent(cb: () => void) {
  window.addEventListener("cookie-consent-changed", cb);
  return () => window.removeEventListener("cookie-consent-changed", cb);
}

function getConsentSnapshot() {
  return localStorage.getItem(STORAGE_KEY) as "granted" | "denied" | null;
}

function getConsentServerSnapshot(): null {
  return null;
}

export default function CookieConsent() {
  const storedConsent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setForceOpen(true);
    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const visible = storedConsent === null || forceOpen;

  function respond(value: "granted" | "denied") {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setForceOpen(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihleri"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white px-4 py-5 shadow-lg sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          Deneyiminizi iyileştirmek için analitik çerezler kullanıyoruz. Daha fazla bilgi için{" "}
          <Link
            href="/cerez-politikasi"
            className="font-medium text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
          >
            Çerez Politikamızı
          </Link>{" "}
          okuyabilirsiniz.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => respond("denied")}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={() => respond("granted")}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
