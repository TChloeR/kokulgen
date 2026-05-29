import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { searchPrograms, getCategories, getDistinctCities } from "@/lib/queries";
import SearchFilters from "@/components/SearchFilters";

export const metadata: Metadata = {
  title: "Program Ara",
  description: "İhtiyacınıza uygun sosyal yardım programını anahtar kelime, kategori, il ve kurum tipine göre arayın.",
};

const METHOD_LABELS: Record<string, string> = {
  ONLINE: "Online",
  YUZ_YUZE: "Yüz yüze",
  HER_IKISI: "Online + Yüz yüze",
  TELEFON: "Telefon",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string; il?: string; tip?: string }>;
}) {
  const sp = await searchParams;
  const [results, categories, cities] = await Promise.all([
    searchPrograms({ q: sp.q, categorySlug: sp.kategori, city: sp.il, type: sp.tip }),
    getCategories(),
    getDistinctCities(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Program Ara</h1>
      <p className="mt-1 text-slate-600">İhtiyacınıza uygun desteği filtreleyerek bulun.</p>

      <div className="mt-6">
        <Suspense>
          <SearchFilters
            categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
            cities={cities}
          />
        </Suspense>
      </div>

      <p className="mt-6 text-sm text-slate-500">{results.length} sonuç bulundu</p>
      <div className="mt-3 space-y-3">
        {results.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Aramanıza uygun program bulunamadı. Filtreleri değiştirmeyi deneyin.
          </p>
        )}
        {results.map((p) => (
          <Link key={p.id} href={`/yardim/${p.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-300">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-semibold text-slate-900">{p.title}</div>
                <div className="mt-0.5 text-sm text-slate-500">
                  {p.organization.name}
                  {p.organization.city && ` · ${p.organization.city}`}
                </div>
                {p.summary && (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{p.summary}</p>
                )}
              </div>
              <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {METHOD_LABELS[p.applicationMethod] ?? p.applicationMethod}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
