import Link from "next/link";
import { notFound } from "next/navigation";
import ProgramForm from "@/components/admin/ProgramForm";
import {
  getProgramByIdAdmin, getOrganizationsForSelect, getCategoriesForSelect,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

const d = (x: Date | null) => (x ? x.toISOString().slice(0, 10) : "");

export default async function EditProgram({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [program, orgs, categories] = await Promise.all([
    getProgramByIdAdmin(id),
    getOrganizationsForSelect(),
    getCategoriesForSelect(),
  ]);
  if (!program) notFound();

  const initial = {
    id: program.id,
    organizationId: program.organizationId,
    title: program.title,
    slug: program.slug,
    summary: program.summary,
    details: program.details,
    conditions: program.conditions,
    applicationMethod: program.applicationMethod,
    onlineApplicationUrl: program.onlineApplicationUrl,
    applicationAddress: program.applicationAddress,
    applicationLatitude: program.applicationLatitude,
    applicationLongitude: program.applicationLongitude,
    applicationStartDate: d(program.applicationStartDate),
    applicationDeadline: d(program.applicationDeadline),
    isAlwaysOpen: program.isAlwaysOpen,
    status: program.status,
    metaTitle: program.metaTitle,
    metaDescription: program.metaDescription,
    categoryIds: program.categories.map((c) => c.categoryId),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Programı Düzenle</h1>
      <Link href={`/admin/programlar/${id}/belgeler`}
        className="mb-6 inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        📄 Belgeleri & Dilekçeleri Yönet
      </Link>
      <ProgramForm orgs={orgs} categories={categories} initial={initial} />
    </div>
  );
}
