import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramDocsTemplates } from "@/lib/queries";
import DocumentsManager from "@/components/admin/DocumentsManager";

export const dynamic = "force-dynamic";

export default async function ProgramDocsPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const program = await getProgramDocsTemplates(id);
  if (!program) notFound();

  const initialDocs = program.requiredDocuments.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description ?? "",
    isMandatory: d.isMandatory,
    orderIndex: d.orderIndex,
    sourceLinks: Array.isArray(d.sourceLinks)
      ? (d.sourceLinks as { label: string; url: string }[])
      : [],
  }));
  const initialTemplates = program.petitionTemplates.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description ?? "",
    format: t.format,
    wordFileUrl: t.wordFileUrl ?? "",
    pdfFileUrl: t.pdfFileUrl ?? "",
    version: t.version,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href={`/admin/programlar/${program.id}`} className="text-sm text-emerald-700 hover:underline">
        ← Programa dön
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Belgeler & Dilekçeler</h1>
      <p className="text-slate-500">{program.title}</p>
      <div className="mt-8">
        <DocumentsManager
          programId={program.id}
          initialDocs={initialDocs}
          initialTemplates={initialTemplates}
        />
      </div>
    </div>
  );
}
