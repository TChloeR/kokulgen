"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveOrganization } from "@/lib/actions/organizations";

const TYPES = [
  { value: "VAKIF", label: "Vakıf" },
  { value: "DERNEK", label: "Dernek" },
  { value: "STK", label: "STK" },
  { value: "DEVLET_KURUMU", label: "Devlet Kurumu" },
  { value: "SIRKET", label: "Şirket" },
  { value: "BELEDIYE", label: "Belediye" },
];
const STATUSES = [
  { value: "TASLAK", label: "Taslak" },
  { value: "YAYINDA", label: "Yayında" },
  { value: "ARSIV", label: "Arşiv" },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replaceAll("ğ", "g").replaceAll("ü", "u").replaceAll("ş", "s")
    .replaceAll("ı", "i").replaceAll("ö", "o").replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

type Initial = {
  id: string; name: string; slug: string; type: string; status: string;
  isVerified: boolean; description: string | null; city: string | null;
  district: string | null; address: string | null; phone: string | null;
  email: string | null; websiteUrl: string | null; logoUrl: string | null;
  latitude: number | null; longitude: number | null;
  metaTitle: string | null; metaDescription: string | null;
};

export default function OrganizationForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    type: initial?.type ?? "VAKIF",
    status: initial?.status ?? "TASLAK",
    isVerified: initial?.isVerified ?? false,
    description: initial?.description ?? "",
    city: initial?.city ?? "",
    district: initial?.district ?? "",
    address: initial?.address ?? "",
    phone: initial?.phone ?? "",
    email: initial?.email ?? "",
    websiteUrl: initial?.websiteUrl ?? "",
    logoUrl: initial?.logoUrl ?? "",
    latitude: initial?.latitude != null ? String(initial.latitude) : "",
    longitude: initial?.longitude != null ? String(initial.longitude) : "",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
  });

  const set = (k: string, v: string | boolean) =>
    setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setSaving(true);
    setError("");
    const res = await saveOrganization({
      id: initial?.id,
      name: f.name.trim(),
      slug: f.slug.trim(),
      type: f.type,
      status: f.status,
      isVerified: f.isVerified,
      description: f.description,
      city: f.city,
      district: f.district,
      address: f.address,
      phone: f.phone,
      email: f.email,
      websiteUrl: f.websiteUrl,
      logoUrl: f.logoUrl,
      latitude: f.latitude ? parseFloat(f.latitude) : null,
      longitude: f.longitude ? parseFloat(f.longitude) : null,
      metaTitle: f.metaTitle,
      metaDescription: f.metaDescription,
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/kurumlar");
      router.refresh();
    } else {
      setError(res.error || "Kaydedilemedi.");
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500";
  const labelCls = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Kurum Adı *</label>
        <input className={inputCls} value={f.name}
          onChange={(e) => set("name", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Slug (URL) *</label>
        <div className="flex gap-2">
          <input className={inputCls} value={f.slug}
            onChange={(e) => set("slug", e.target.value)} placeholder="ornek-kurum" />
          <button type="button"
            onClick={() => set("slug", slugify(f.name))}
            className="whitespace-nowrap rounded-lg border border-slate-300 px-3 text-sm text-slate-600 hover:bg-slate-50">
            İsimden üret
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Kurum Tipi</label>
          <select className={inputCls} value={f.type}
            onChange={(e) => set("type", e.target.value)}>
            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Yayın Durumu</label>
          <select className={inputCls} value={f.status}
            onChange={(e) => set("status", e.target.value)}>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={f.isVerified}
          onChange={(e) => set("isVerified", e.target.checked)} />
        Doğrulanmış kurum
      </label>

      <div>
        <label className={labelCls}>Açıklama</label>
        <textarea className={inputCls} rows={3} value={f.description}
          onChange={(e) => set("description", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>İl</label>
          <input className={inputCls} value={f.city}
            onChange={(e) => set("city", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>İlçe</label>
          <input className={inputCls} value={f.district}
            onChange={(e) => set("district", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Adres</label>
        <textarea className={inputCls} rows={2} value={f.address}
          onChange={(e) => set("address", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Enlem (latitude)</label>
          <input className={inputCls} value={f.latitude}
            onChange={(e) => set("latitude", e.target.value)} placeholder="39.92" />
        </div>
        <div>
          <label className={labelCls}>Boylam (longitude)</label>
          <input className={inputCls} value={f.longitude}
            onChange={(e) => set("longitude", e.target.value)} placeholder="32.85" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Telefon</label>
          <input className={inputCls} value={f.phone}
            onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>E-posta</label>
          <input className={inputCls} value={f.email}
            onChange={(e) => set("email", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Web Sitesi</label>
        <input className={inputCls} value={f.websiteUrl}
          onChange={(e) => set("websiteUrl", e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label className={labelCls}>Logo URL</label>
        <input className={inputCls} value={f.logoUrl}
          onChange={(e) => set("logoUrl", e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label className={labelCls}>SEO Başlık (metaTitle)</label>
        <input className={inputCls} value={f.metaTitle}
          onChange={(e) => set("metaTitle", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>SEO Açıklama (metaDescription)</label>
        <textarea className={inputCls} rows={2} value={f.metaDescription}
          onChange={(e) => set("metaDescription", e.target.value)} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button onClick={submit} disabled={saving || !f.name || !f.slug}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button type="button" onClick={() => router.push("/admin/kurumlar")}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50">
          İptal
        </button>
      </div>
    </div>
  );
}
