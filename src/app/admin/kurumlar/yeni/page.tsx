import OrganizationForm from "@/components/admin/OrganizationForm";

export default function NewOrganization() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Yeni Kurum</h1>
      <OrganizationForm />
    </div>
  );
}
