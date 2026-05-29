"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TYPES = [
  { value: "", label: "Tüm kurum tipleri" },
  { value: "VAKIF", label: "Vakıf" },
  { value: "DERNEK", label: "Dernek" },
  { value: "STK", label: "STK" },
  { value: "DEVLET_KURUMU", label: "Devlet Kurumu" },
  { value: "SIRKET", label: "Şirket" },
  { value: "BELEDIYE", label: "Belediye" },
];

export default function SearchFilters({
  categories,
  cities,
}: {
  categories: { slug: string; name: string }[];
  cities: string[];
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");

  const apply = (patch: Record<string, string>) => {
    const params = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    router.push(`/ara?${params.toString()}`);
  };

  const sel =
    "rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500";
  const hasFilters =
    sp.get("q") || sp.get("kategori") || sp.get("il") || sp.get("tip");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && apply({ q })}
          placeholder="Program ara (örn. burs, gıda, nakdi)..."
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-emerald-500"
        />
        <button
          onClick={() => apply({ q })}
          className="rounded-lg bg-emerald-600 px-5 font-medium text-white hover:bg-emerald-700"
        >
          Ara
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <select className={sel} value={sp.get("kategori") ?? ""}
          onChange={(e) => apply({ kategori: e.target.value })}>
          <option value="">Tüm kategoriler</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <select className={sel} value={sp.get("il") ?? ""}
          onChange={(e) => apply({ il: e.target.value })}>
          <option value="">Tüm iller</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className={sel} value={sp.get("tip") ?? ""}
          onChange={(e) => apply({ tip: e.target.value })}>
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {hasFilters && (
          <button
            onClick={() => { setQ(""); router.push("/ara"); }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Temizle
          </button>
        )}
      </div>
    </div>
  );
}
