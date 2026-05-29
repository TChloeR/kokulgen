import ProgramForm from "@/components/admin/ProgramForm";
import { getOrganizationsForSelect, getCategoriesForSelect } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function NewProgram() {
  const [orgs, categories] = await Promise.all([
    getOrganizationsForSelect(),
    getCategoriesForSelect(),
  ]);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Yeni Program</h1>
      {orgs.length === 0 ? (
        <p className="text-slate-500">Önce en az bir kurum eklemelisiniz.</p>
      ) : (
        <ProgramForm orgs={orgs} categories={categories} />
      )}
    </div>
  );
}
