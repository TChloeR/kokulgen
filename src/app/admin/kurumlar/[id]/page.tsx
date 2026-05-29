import { notFound } from "next/navigation";
import OrganizationForm from "@/components/admin/OrganizationForm";
import { getOrganizationById } from "@/lib/queries";

export default async function EditOrganization({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const org = await getOrganizationById(id);
  if (!org) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Kurumu Düzenle</h1>
      <OrganizationForm initial={org} />
    </div>
  );
}
