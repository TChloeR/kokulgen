"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveProgram } from "@/lib/actions/programs";

const METHODS = [
  { value: "ONLINE", label: "Online" },
  { value: "YUZ_YUZE", label: "Yüz yüze" },
  { value: "HER_IKISI", label: "Online + Yüz yüze" },
  { value: "TELEFON", label: "Telefon" },
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

type Opt = { id: string; name: string };
type Initial = {
  id: string; organizationId: string; title: string; slug: string;
  summary: string | null; details: string; conditions: string;
  applicationMethod: string; onlineApplicationUrl: string | null;
  applicationAddress: string | null;
  applicationLatitude: number | null; applicationLongitude: number | null;
  applicationStartDate: string; applicationDeadline: string;
  isAlwaysOpen: boolean; status: string;
  metaTitle: string | null; metaDescription: string | null;
  categoryIds: string[];
};

export default function ProgramForm({
  orgs, categories, initial,
}: { orgs: Opt[]; categories: Opt[]; initial?: Initial }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [cats, setCats] = useState<string[]>(initial?.categoryIds ?? []);
  const [f, setF] = useState({
    organizationId: initial?.organizationId ?? (orgs[0]?.id ?? ""),
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    summary: initial?.summary ?? "",
    details: initial?.details ?? "",
    conditions: initial?.conditions ?? "",
    applicationMethod: initial?.applicationMethod ?? "YUZ_YUZE",
    onlineApplicationUrl: initial?.onlineApplicationUrl ?? "",
    applicationAddress: initial?.applicationAddress ?? "",
    applicationLatitude: initial?.applicationLatitude != null ? String(initial.applicationLatitude) : "",
    applicationLongitude: initial?.applicationLongitude != null ? String(initial.applicationLongitude) : "",
    applicationStartDate: initial?.applicationStartDate ?? "",
    applicationDeadline: initial?.applicationDeadline ?? "",
    isAlwaysOpen: initial?.isAlwaysOpen ?? false,
    status: initial?.status ?? "TASLAK",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
  });

  const set = (k: string, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const toggleCat = (id: string) =>
    setCats((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const submit = async () => {
    setSaving(true);
    setError("");
    const res = await saveProgram({
      id: initial?.id,
      organizationId: f.organizationId,
      title: f.title.trim(),
      slug: f.slug.trim(),
      summary: f.summary,
      details: f.details,
      conditions: f.conditions,
      applicationMethod: f.applicationMethod,
      onlineApplicationUrl: f.onlineApplicationUrl,
      applicationAddress: f.applicationAddress,
      applicationLatitude: f.applicationLatitude ? parseFloat(f.applicationLatitude) : null,
      applicationLongitude: f.applicationLongitude ? parseFloat(f.applicationLongitude) : null,
      applicationStartDate: f.applicationStartDate,
      applicationDeadline: f.applicationDeadline,
      isAlwaysOpen: f.isAlwaysOpen,
      status: f.status,
      metaTitle: f.metaTitle,
      metaDescription: f.metaDescription,
      categoryIds: cats,
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/programlar");
      router.refresh();
    } else {
      setError(res.error || "Kaydedilemedi.");
    }
  };

  const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500";
  const labelCls = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Kurum *</label>
        <select className={inputCls} value={f.organizationId}
          onChange={(e) => set("organizationId", e.target.value)}>
          {orgs.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
        </select>
      </div>

      <div>
        <label className={labelCls}>Program Başlığı *</label>
        <input className={inputCls} value={f.title}
          onChange={(e) => set("title", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Slug (URL) *</label>
        <div className="flex gap-2">
          <input className={inputCls} value={f.slug}
            onChange={(e) => set("slug", e.target.value)} placeholder="ornek-program" />
          <button type="button" onClick={() => set("slug", slugify(f.title))}
            className="whitespace-nowrap rounded-lg border border-slate-300 px-3 text-sm text-slate-600 hover:bg-slate-50">
            Başlıktan üret
          </button>
        </div>
      </div>

      <div>
        <label className={labelCls}>Kısa Özet</label>
        <textarea className={inputCls} rows={2} value={f.summary}
          onChange={(e) => set("summary", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Program Detayı *</label>
        <textarea className={inputCls} rows={4} value={f.details}
          onChange={(e) => set("details", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Başvuru Şartları *</label>
        <textarea className={inputCls} rows={3} value={f.conditions}
          onChange={(e) => set("conditions", e.target.value)} />
      </div>

      <div>
        <label className={labelCls}>Kategoriler (birden fazla seçilebilir)</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <input type="checkbox" checked={cats.includes(c.id)} onChange={() => toggleCat(c.id)} />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Başvuru Yöntemi</label>
          <select className={inputCls} value={f.applicationMethod}
            onChange={(e) => set("applicationMethod", e.target.value)}>
            {METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
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

      <div>
        <label className={labelCls}>Online Başvuru Linki</label>
        <input className={inputCls} value={f.onlineApplicationUrl}
          onChange={(e) => set("onlineApplicationUrl", e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label className={labelCls}>Başvuru Adresi (yüz yüze)</label>
        <textarea className={inputCls} rows={2} value={f.applicationAddress}
          onChange={(e) => set("applicationAddress", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Başvuru Enlem</label>
          <input className={inputCls} value={f.applicationLatitude}
            onChange={(e) => set("applicationLatitude", e.target.value)} placeholder="39.92" />
        </div>
        <div>
          <label className={labelCls}>Başvuru Boylam</label>
          <input className={inputCls} value={f.applicationLongitude}
            onChange={(e) => set("applicationLongitude", e.target.value)} placeholder="32.85" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Başvuru Başlangıç</label>
          <input type="date" className={inputCls} value={f.applicationStartDate}
            onChange={(e) => set("applicationStartDate", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Son Başvuru</label>
          <input type="date" className={inputCls} value={f.applicationDeadline}
            onChange={(e) => set("applicationDeadline", e.target.value)} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={f.isAlwaysOpen}
          onChange={(e) => set("isAlwaysOpen", e.target.checked)} />
        Başvuru sürekli açık
      </label>

      <div>
        <label className={labelCls}>SEO Başlık</label>
        <input className={inputCls} value={f.metaTitle}
          onChange={(e) => set("metaTitle", e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>SEO Açıklama</label>
        <textarea className={inputCls} rows={2} value={f.metaDescription}
          onChange={(e) => set("metaDescription", e.target.value)} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button onClick={submit} disabled={saving || !f.title || !f.slug || !f.organizationId}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button type="button" onClick={() => router.push("/admin/programlar")}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50">
          İptal
        </button>
      </div>
    </div>
  );
}
