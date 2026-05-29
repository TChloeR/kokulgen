import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProgramBySlug, getAllProgramSlugs } from "@/lib/queries";
import DocumentChecklist from "@/components/DocumentChecklist";
import LocationMap from "@/components/LocationMap";

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program bulunamadı" };
  return {
    title: program.metaTitle ?? program.title,
    description: program.metaDescription ?? program.summary ?? undefined,
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);

  if (!program || program.status !== "YAYINDA") notFound();

  const org = program.organization;
  const method = program.applicationMethod;

  const showOnline = method === "ONLINE" || method === "HER_IKISI";
  const showAddress = method === "YUZ_YUZE" || method === "HER_IKISI";
  const showPhone = method === "TELEFON";

  const address = program.applicationAddress ?? org.address;
  const lat = program.applicationLatitude ?? org.latitude;
  const lng = program.applicationLongitude ?? org.longitude;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/" className="text-sm text-emerald-700 hover:underline">
        ← Anasayfa
      </Link>

      {/* Başlık */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {org.name}
        </span>
        {org.isVerified && (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            ✓ Doğrulanmış
          </span>
        )}
      </div>
      <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
        {program.title}
      </h1>
      {program.summary && (
        <p className="mt-2 text-lg text-slate-600">{program.summary}</p>
      )}

      {/* Detay */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Program Detayı</h2>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">
          {program.details}
        </p>
      </section>

      {/* Şartlar */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900">Başvuru Şartları</h2>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">
          {program.conditions}
        </p>
      </section>

      {/* Başvuru yöntemi */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Nasıl Başvurulur?</h2>

        {showOnline && program.onlineApplicationUrl && (
          <a
            href={program.onlineApplicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
          >
            Online Başvuru Yap →
          </a>
        )}

        {showPhone && org.phone && (
          <p className="mt-4 text-slate-700">
            📞 Telefonla başvuru: <strong>{org.phone}</strong>
          </p>
        )}

        {showAddress && address && (
          <div className="mt-4">
            <p className="text-slate-700">📍 {address}</p>
            {lat != null && lng != null && (
              <div className="mt-3">
                <LocationMap lat={lat} lng={lng} name={org.name} />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Belge checklist'i */}
      {program.requiredDocuments.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Gerekli Belgeler
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Topladığınız belgeleri işaretleyebilirsiniz.
          </p>
          <div className="mt-3">
            <DocumentChecklist documents={program.requiredDocuments} />
          </div>
        </section>
      )}

      {/* Dilekçe şablonları */}
      {program.petitionTemplates.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Hazır Dilekçe Şablonları
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            İndirin, bilgilerinizi doldurun ve başvurunuzda kullanın.
          </p>
          <div className="mt-3 space-y-3">
            {program.petitionTemplates.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-medium text-slate-900">{t.title}</h3>
                {t.description && (
                  <p className="mt-1 text-sm text-slate-600">{t.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3">
                  {t.wordFileUrl && (
                    <a
                      href={t.wordFileUrl}
                      download
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      ⬇ Word (.docx) indir
                    </a>
                  )}
                  {t.pdfFileUrl && (
                    <a
                      href={t.pdfFileUrl}
                      download
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      ⬇ PDF indir
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}