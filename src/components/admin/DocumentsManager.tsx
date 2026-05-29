"use client";

import { useState } from "react";
import {
  saveDocument, deleteDocument,
  savePetitionTemplate, deletePetitionTemplate,
} from "@/lib/actions/documents";

type Link = { label: string; url: string };
type Doc = {
  key: string; id?: string; name: string; description: string;
  isMandatory: boolean; orderIndex: number; sourceLinks: Link[];
  saving?: boolean; msg?: string;
};
type Tpl = {
  key: string; id?: string; title: string; description: string;
  format: string; wordFileUrl: string; pdfFileUrl: string; version: string;
  saving?: boolean; msg?: string;
};

const FORMATS = [
  { value: "WORD", label: "Word" },
  { value: "PDF", label: "PDF" },
  { value: "HER_IKISI", label: "Word + PDF" },
];

let counter = 0;
const newKey = () => `k${Date.now()}_${counter++}`;

export default function DocumentsManager({
  programId, initialDocs, initialTemplates,
}: {
  programId: string;
  initialDocs: Omit<Doc, "key">[];
  initialTemplates: Omit<Tpl, "key">[];
}) {
  const [docs, setDocs] = useState<Doc[]>(initialDocs.map((d) => ({ ...d, key: newKey() })));
  const [tpls, setTpls] = useState<Tpl[]>(initialTemplates.map((t) => ({ ...t, key: newKey() })));

  const updateDoc = (key: string, patch: Partial<Doc>) =>
    setDocs((p) => p.map((d) => (d.key === key ? { ...d, ...patch } : d)));
  const addDoc = () =>
    setDocs((p) => [...p, { key: newKey(), name: "", description: "", isMandatory: true, orderIndex: p.length + 1, sourceLinks: [] }]);
  const saveDoc = async (d: Doc) => {
    updateDoc(d.key, { saving: true, msg: "" });
    const res = await saveDocument({
      id: d.id, programId, name: d.name, description: d.description,
      isMandatory: d.isMandatory, orderIndex: d.orderIndex,
      sourceLinks: d.sourceLinks.filter((l) => l.url.trim()),
    });
    if (res.ok) updateDoc(d.key, { saving: false, id: res.id, msg: "Kaydedildi ✓" });
    else updateDoc(d.key, { saving: false, msg: res.error || "Hata" });
  };
  const delDoc = async (d: Doc) => {
    if (d.id) await deleteDocument(d.id);
    setDocs((p) => p.filter((x) => x.key !== d.key));
  };
  const addLink = (key: string) =>
    setDocs((p) => p.map((d) => d.key === key ? { ...d, sourceLinks: [...d.sourceLinks, { label: "", url: "" }] } : d));
  const updateLink = (key: string, i: number, patch: Partial<Link>) =>
    setDocs((p) => p.map((d) => d.key === key ? { ...d, sourceLinks: d.sourceLinks.map((l, idx) => idx === i ? { ...l, ...patch } : l) } : d));
  const removeLink = (key: string, i: number) =>
    setDocs((p) => p.map((d) => d.key === key ? { ...d, sourceLinks: d.sourceLinks.filter((_, idx) => idx !== i) } : d));

  const updateTpl = (key: string, patch: Partial<Tpl>) =>
    setTpls((p) => p.map((t) => (t.key === key ? { ...t, ...patch } : t)));
  const addTpl = () =>
    setTpls((p) => [...p, { key: newKey(), title: "", description: "", format: "HER_IKISI", wordFileUrl: "", pdfFileUrl: "", version: "1.0" }]);
  const saveTpl = async (t: Tpl) => {
    updateTpl(t.key, { saving: true, msg: "" });
    const res = await savePetitionTemplate({
      id: t.id, programId, title: t.title, description: t.description,
      format: t.format, wordFileUrl: t.wordFileUrl, pdfFileUrl: t.pdfFileUrl, version: t.version,
    });
    if (res.ok) updateTpl(t.key, { saving: false, id: res.id, msg: "Kaydedildi ✓" });
    else updateTpl(t.key, { saving: false, msg: res.error || "Hata" });
  };
  const delTpl = async (t: Tpl) => {
    if (t.id) await deletePetitionTemplate(t.id);
    setTpls((p) => p.filter((x) => x.key !== t.key));
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url ?? null;
  };

  const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500";

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Gerekli Belgeler</h2>
          <button onClick={addDoc} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">+ Belge ekle</button>
        </div>
        <div className="mt-4 space-y-4">
          {docs.length === 0 && <p className="text-slate-500">Henüz belge yok.</p>}
          {docs.map((d) => (
            <div key={d.key} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
              <input className={inputCls} placeholder="Belge adı (örn. Nüfus Kayıt Örneği)"
                value={d.name} onChange={(e) => updateDoc(d.key, { name: e.target.value })} />
              <input className={inputCls} placeholder="Açıklama (opsiyonel)"
                value={d.description} onChange={(e) => updateDoc(d.key, { description: e.target.value })} />
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={d.isMandatory} onChange={(e) => updateDoc(d.key, { isMandatory: e.target.checked })} />
                Zorunlu belge
              </label>
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">E-Devlet / kaynak linkleri</span>
                  <button onClick={() => addLink(d.key)} className="text-sm text-emerald-700 hover:underline">+ Link ekle</button>
                </div>
                {d.sourceLinks.length === 0 && <p className="text-xs text-slate-400">Link yok.</p>}
                <div className="space-y-2">
                  {d.sourceLinks.map((l, i) => (
                    <div key={i} className="flex gap-2">
                      <input className={inputCls + " flex-1"} placeholder="Etiket"
                        value={l.label} onChange={(e) => updateLink(d.key, i, { label: e.target.value })} />
                      <input className={inputCls + " flex-1"} placeholder="https://www.turkiye.gov.tr/..."
                        value={l.url} onChange={(e) => updateLink(d.key, i, { url: e.target.value })} />
                      <button onClick={() => removeLink(d.key, i)} className="rounded-lg border border-slate-300 px-2 text-slate-500 hover:bg-white">✕</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => saveDoc(d)} disabled={d.saving || !d.name}
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
                  {d.saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
                <button onClick={() => delDoc(d)} className="rounded-lg border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">Sil</button>
                {d.msg && <span className="text-sm text-slate-500">{d.msg}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Dilekçe Şablonları</h2>
          <button onClick={addTpl} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">+ Şablon ekle</button>
        </div>
        <p className="mt-1 text-sm text-slate-500">Word/PDF dosyasını yükleyin; bağlantı otomatik dolar.</p>
        <div className="mt-4 space-y-4">
          {tpls.length === 0 && <p className="text-slate-500">Henüz şablon yok.</p>}
          {tpls.map((t) => (
            <div key={t.key} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
              <input className={inputCls} placeholder="Başlık (örn. Başvuru Dilekçesi)"
                value={t.title} onChange={(e) => updateTpl(t.key, { title: e.target.value })} />
              <input className={inputCls} placeholder="Açıklama (opsiyonel)"
                value={t.description} onChange={(e) => updateTpl(t.key, { description: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className={inputCls} value={t.format} onChange={(e) => updateTpl(t.key, { format: e.target.value })}>
                  {FORMATS.map((ff) => <option key={ff.value} value={ff.value}>{ff.label}</option>)}
                </select>
                <input className={inputCls} placeholder="Sürüm (örn. 1.0)"
                  value={t.version} onChange={(e) => updateTpl(t.key, { version: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">Word yükle (.docx)</label>
                  <input type="file" accept=".docx,.doc" className="text-sm"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      updateTpl(t.key, { msg: "Word yükleniyor..." });
                      const url = await uploadFile(file);
                      if (url) updateTpl(t.key, { wordFileUrl: url, msg: "Word yüklendi ✓" });
                      else updateTpl(t.key, { msg: "Yükleme hatası" });
                    }} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">PDF yükle (.pdf)</label>
                  <input type="file" accept=".pdf" className="text-sm"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      updateTpl(t.key, { msg: "PDF yükleniyor..." });
                      const url = await uploadFile(file);
                      if (url) updateTpl(t.key, { pdfFileUrl: url, msg: "PDF yüklendi ✓" });
                      else updateTpl(t.key, { msg: "Yükleme hatası" });
                    }} />
                </div>
              </div>
              <input className={inputCls} placeholder="Word dosya URL (.docx)"
                value={t.wordFileUrl} onChange={(e) => updateTpl(t.key, { wordFileUrl: e.target.value })} />
              <input className={inputCls} placeholder="PDF dosya URL (.pdf)"
                value={t.pdfFileUrl} onChange={(e) => updateTpl(t.key, { pdfFileUrl: e.target.value })} />
              <div className="flex items-center gap-3">
                <button onClick={() => saveTpl(t)} disabled={t.saving || !t.title}
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
                  {t.saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
                <button onClick={() => delTpl(t)} className="rounded-lg border border-red-200 px-4 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">Sil</button>
                {t.msg && <span className="text-sm text-slate-500">{t.msg}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
