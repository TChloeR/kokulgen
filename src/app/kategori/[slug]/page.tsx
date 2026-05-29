import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryWithPrograms, getAllCategorySlugs } from "@/lib/queries";

// SEO: build sırasında tüm kategori sayfalarını statik üret
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

// SEO: her kategori için dinamik meta
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategoryWithPrograms(slug);
  if (!cat) return { title: "Kategori bulunamadı" };
  return {
    title: cat.metaTitle ?? cat.name,
    description: cat.metaDescription ?? cat.description ?? undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryWithPrograms(slug);

  if (!category) notFound();

  const programs = category.programs.map((pc) => pc.program);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-sm text-emerald-700 hover:underline">
        ← Tüm kategoriler
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        {category.name}
      </h1>
      {category.description && (
        <p className="mt-2 max-w-3xl text-slate-600">{category.description}</p>
      )}

      <div className="mt-8 space-y-4">
        {programs.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
            Bu kategoride henüz yayınlanmış bir destek programı bulunmuyor.
          </p>
        )}

        {programs.map((program) => (
          <div
            key={program.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                {program.organization.name}
              </span>
              {program.organization.isVerified && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  ✓ Doğrulanmış
                </span>
              )}
            </div>

            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              {program.title}
            </h3>
            {program.summary && (
              <p className="mt-1 text-sm text-slate-600">{program.summary}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {program.organization.city && (
                <span className="text-slate-500">📍 {program.organization.city}</span>
              )}
              <span className="text-slate-500">
                Başvuru:{" "}
                {program.applicationMethod === "ONLINE"
                  ? "Online"
                  : program.applicationMethod === "YUZ_YUZE"
                  ? "Yüz yüze"
                  : program.applicationMethod === "TELEFON"
                  ? "Telefon"
                  : "Online / Yüz yüze"}
              </span>
            </div>

            {/* Detay linki — sonraki adımda program detay sayfasını yapacağız */}
            <Link
              href={`/yardim/${program.slug}`}
              className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Detayları gör
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}