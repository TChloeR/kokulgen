import Link from "next/link";
import { Users, Search, FileText, ListChecks } from "lucide-react";
import { CATEGORY_ICONS } from "@/lib/categoryIcons";
import { getCategories } from "@/lib/queries";

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            İhtiyacınıza uygun sosyal yardımı bulun
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Durumunuza uygun kategoriyi seçin; size özel destek sağlayan vakıf, dernek,
            STK ve devlet kurumlarını, başvuru şartlarını ve gerekli belgeleri tek sayfada görün.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/ara"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700">
              <Search className="h-5 w-5" /> Programlarda Ara
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-slate-900">Kimlere destek sağlıyoruz?</h2>
        <p className="mt-2 text-center text-slate-500">Size en uygun kategoriyi seçerek başlayın.</p>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.iconName ?? ""] ?? Users;
            return (
              <Link key={cat.id} href={`/kategori/${cat.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{cat.description}</p>
                )}
                <span className="mt-4 inline-block text-sm font-medium text-emerald-700">
                  Destekleri gör →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold text-slate-900">Nasıl çalışır?</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">1. Grubunuzu seçin</h3>
              <p className="mt-1 text-sm text-slate-600">Durumunuza uygun kategoriyi belirleyin.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <ListChecks className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">2. Programı inceleyin</h3>
              <p className="mt-1 text-sm text-slate-600">Şartları, gerekli belgeleri ve başvuru yolunu görün.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">3. Belgeleri hazırlayın</h3>
              <p className="mt-1 text-sm text-slate-600">E-Devlet linkleri ve hazır dilekçelerle başvurun.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
