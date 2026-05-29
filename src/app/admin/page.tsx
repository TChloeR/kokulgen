"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Yönetim Paneli</h1>
        <button
          onClick={logout}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Çıkış Yap
        </button>
      </div>
      <p className="mt-2 text-slate-600">
        Hoş geldin. Bir sonraki adımda buraya kurum yönetimi eklenecek.
      </p>
      <div className="mt-8 space-y-3">
        <Link href="/admin/kurumlar"
          className="block rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300">
          <div className="text-lg font-semibold text-slate-900">Kurumlar</div>
          <div className="text-sm text-slate-500">Kurum ekle, düzenle ve listele</div>
        </Link>
        <Link href="/admin/programlar"
          className="block rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300">
          <div className="text-lg font-semibold text-slate-900">Programlar</div>
          <div className="text-sm text-slate-500">Yardım programı ekle, düzenle ve listele</div>
        </Link>
        <Link href="/admin/kategoriler"
          className="mt-4 block rounded-2xl border border-slate-200 bg-white p-6 hover:border-emerald-300">
          <div className="text-lg font-semibold text-slate-900">Kategoriler</div>
          <div className="text-sm text-slate-500">Kategori ekle, düzenle ve sırala</div>
        </Link>
      </div>
    </div>
  );
}
