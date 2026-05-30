"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="text-xs text-slate-400 underline underline-offset-2 transition hover:text-slate-600"
    >
      Çerez ayarları
    </button>
  );
}
