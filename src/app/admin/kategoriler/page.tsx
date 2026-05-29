import Link from "next/link";
import { getCategoriesAdmin } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminCategories() {
  const cats = await getCategoriesAdmin();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Kategoriler</h1>
        <Link href="/admin/kategoriler/yeni"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          + Yeni Kategori
        </Link>
      </div>
      <Link href="/admin" className="mt-2 inline-block text-sm text-emerald-700 hover:underline">← Panele dön</Link>
      <div className="mt-6 space-y-2">
        {cats.length === 0 && <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">Henüz kategori yok.</p>}
        {cats.map((c) => (
          <Link key={c.id} href={`/admin/kategoriler/${c.id}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300">
            <div>
              <div className="font-medium text-slate-900">{c.name}</div>
              <div className="text-sm text-slate-500">/{c.slug} · {c._count.programs} program</div>
            </div>
            <span className="text-xs text-slate-400">Sıra: {c.orderIndex}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
