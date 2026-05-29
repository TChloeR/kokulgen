"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveCategory, deleteCategory } from "@/lib/actions/categories";
import { CATEGORY_ICON_OPTIONS } from "@/lib/categoryIcons";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replaceAll("ğ", "g").replaceAll("ü", "u").replaceAll("ş", "s")
    .replaceAll("ı", "i").replaceAll("ö", "o").replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

type Initial = {
  id: string; slug: string; name: string; description: string | null;
  iconName: string | null; orderIndex: number;
  metaTitle: string | null; metaDescription: string | null;
};

export default function CategoryForm({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({
    slug: initial?.slug ?? "",
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    iconName: initial?.iconName ?? "people",
    orderIndex: initial?.orderIndex != null ? String(initial.orderIndex) : "0",
    metaTitle: initial?.metaTitle ?? "",
    metaDescription: initial?.metaDescription ?? "",
  });

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    setSaving(true);
    setError("");
    const res = await saveCategory({
      id: initial?.id,
      slug: f.slug.trim(),
      name: f.name.trim(),
      description: f.description,
      iconName: f.iconName,
      orderIndex: parseInt(f.orderIndex) || 0,
      metaTitle: f.metaTitle,
      metaDescription: f.metaDescription,
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/kategoriler");
      router.refresh();
    } else setError(res.error || "Kaydedilemedi.");
  };

  const remove = async () => {
    if (!initial?.id) return;
    if (!confirm("Bu kategoriyi silmek istediğinize emin misiniz? Programlarla bağlantısı kaldırılır.")) return;
    await deleteCategory(initial.id);
    router.push("/admin/kategoriler");
    router.refresh();
  };

  const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500";
  const labelCls = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="space-y-5">
      <div>
        <label className={labelCls}>Kategori Adı *</label>
        <input className={inputCls} value={f.name} onChange={(e) => set("name", e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>Slug (URL) *</label>
        <div className="flex gap-2">
          <input className={inputCls} value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="ornek-kategori" />
          <button type="button" onClick={() => set("slug", slugify(f.name))}
            className="whitespace-nowrap rounded-lg border border-slate-300 px-3 text-sm text-slate-600 hover:bg-slate-50">
            İsimden üret
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>İkon</label>
          <select className={inputCls} value={f.iconName} onChange={(e) => set("iconName", e.target.value)}>
            {CATEGORY_ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Sıra (orderIndex)</label>
          <input className={inputCls} value={f.orderIndex} onChange={(e) => set("orderIndex", e.target.value)} placeholder="0" />
        </div>
      </div>
      <div>
        <label className={labelCls}>Açıklama</label>
        <textarea className={inputCls} rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>SEO Başlık</label>
        <input className={inputCls} value={f.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
      </div>
      <div>
        <label className={labelCls}>SEO Açıklama</label>
        <textarea className={inputCls} rows={2} value={f.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button onClick={submit} disabled={saving || !f.name || !f.slug}
          className="rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button type="button" onClick={() => router.push("/admin/kategoriler")}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50">
          İptal
        </button>
        {initial?.id && (
          <button type="button" onClick={remove}
            className="ml-auto rounded-lg border border-red-200 px-5 py-2.5 font-medium text-red-600 hover:bg-red-50">
            Sil
          </button>
        )}
      </div>
    </div>
  );
}
