import Link from "next/link";
import { getOrganizations } from "@/lib/queries";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  VAKIF: "Vakıf", DERNEK: "Dernek", STK: "STK",
  DEVLET_KURUMU: "Devlet Kurumu", SIRKET: "Şirket", BELEDIYE: "Belediye",
};

export default async function AdminOrganizations() {
  const orgs = await getOrganizations();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Kurumlar</h1>
        <Link href="/admin/kurumlar/yeni"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          + Yeni Kurum
        </Link>
      </div>
      <Link href="/admin" className="mt-2 inline-block text-sm text-emerald-700 hover:underline">
        ← Panele dön
      </Link>

      <div className="mt-6 space-y-2">
        {orgs.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Henüz kurum eklenmemiş.
          </p>
        )}
        {orgs.map((o) => (
          <Link key={o.id} href={`/admin/kurumlar/${o.id}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-300">
            <div>
              <div className="font-medium text-slate-900">{o.name}</div>
              <div className="text-sm text-slate-500">
                {TYPE_LABELS[o.type] ?? o.type} · {o.city ?? "İl yok"} · {o._count.programs} program
              </div>
            </div>
            <div className="flex items-center gap-2">
              {o.isVerified && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">✓</span>}
              <span className={`rounded-full px-2 py-0.5 text-xs ${
                o.status === "YAYINDA" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}>
                {o.status === "YAYINDA" ? "Yayında" : o.status === "TASLAK" ? "Taslak" : "Arşiv"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
