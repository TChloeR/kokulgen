import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { getCategoryByIdAdmin } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditCategory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat = await getCategoryByIdAdmin(id);
  if (!cat) notFound();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Kategoriyi Düzenle</h1>
      <CategoryForm initial={cat} />
    </div>
  );
}
