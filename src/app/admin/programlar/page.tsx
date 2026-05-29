import Link from "next/link";
import { getProgramsAdmin } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminPrograms() {
  const programs = await getProgramsAdmin();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Programlar</h1>
        <Link href="/admin/programlar/yeni"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          + Yeni Program
        </Link>
      </div>
      <Link href="/admin" className="mt-2 inline-block text-sm text-emerald-700 hover:underline">
        ← Panele dön
      </Link>

      <div className="mt-6 space-y-2">
        {programs.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Henüz program eklenmemiş.
          </p>
        )}
        {programs.map((p) => (
          <Link key={p.id} href={`/admin/programlar/${p.id}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300">
            <div>
              <div className="font-medium text-slate-900">{p.title}</div>
              <div className="text-sm text-slate-500">{p.organization.name}</div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${
              p.status === "YAYINDA" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
            }`}>
              {p.status === "YAYINDA" ? "Yayında" : p.status === "TASLAK" ? "Taslak" : "Arşiv"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
