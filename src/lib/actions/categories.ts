"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CategoryInput = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  orderIndex: number;
  metaTitle: string;
  metaDescription: string;
};

export async function saveCategory(
  input: CategoryInput
): Promise<{ ok: boolean; error?: string }> {
  const data = {
    slug: input.slug,
    name: input.name,
    description: input.description || null,
    iconName: input.iconName || null,
    orderIndex: input.orderIndex,
    metaTitle: input.metaTitle || null,
    metaDescription: input.metaDescription || null,
  };
  try {
    if (input.id) await prisma.category.update({ where: { id: input.id }, data });
    else await prisma.category.create({ data });
    revalidatePath("/", "layout");
    revalidatePath("/admin/kategoriler");
    return { ok: true };
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2002")
      return { ok: false, error: "Bu slug zaten kullanılıyor." };
    return { ok: false, error: "Kaydedilemedi." };
  }
}

export async function deleteCategory(id: string): Promise<{ ok: boolean }> {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/", "layout");
    revalidatePath("/admin/kategoriler");
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
