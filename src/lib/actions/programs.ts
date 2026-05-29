"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ApplicationMethod, PublishStatus } from "@prisma/client";

export type ProgramInput = {
  id?: string;
  organizationId: string;
  title: string;
  slug: string;
  summary: string;
  details: string;
  conditions: string;
  applicationMethod: string;
  onlineApplicationUrl: string;
  applicationAddress: string;
  applicationLatitude: number | null;
  applicationLongitude: number | null;
  applicationStartDate: string;
  applicationDeadline: string;
  isAlwaysOpen: boolean;
  status: string;
  metaTitle: string;
  metaDescription: string;
  categoryIds: string[];
};

export async function saveProgram(
  input: ProgramInput
): Promise<{ ok: boolean; error?: string }> {
  const data = {
    organizationId: input.organizationId,
    title: input.title,
    slug: input.slug,
    summary: input.summary || null,
    details: input.details,
    conditions: input.conditions,
    applicationMethod: input.applicationMethod as ApplicationMethod,
    onlineApplicationUrl: input.onlineApplicationUrl || null,
    applicationAddress: input.applicationAddress || null,
    applicationLatitude: input.applicationLatitude,
    applicationLongitude: input.applicationLongitude,
    applicationStartDate: input.applicationStartDate ? new Date(input.applicationStartDate) : null,
    applicationDeadline: input.applicationDeadline ? new Date(input.applicationDeadline) : null,
    isAlwaysOpen: input.isAlwaysOpen,
    status: input.status as PublishStatus,
    metaTitle: input.metaTitle || null,
    metaDescription: input.metaDescription || null,
  };
  try {
    let programId = input.id;
    if (input.id) {
      await prisma.aidProgram.update({ where: { id: input.id }, data });
    } else {
      const created = await prisma.aidProgram.create({ data });
      programId = created.id;
    }
    await prisma.programCategory.deleteMany({ where: { programId } });
    if (input.categoryIds.length > 0) {
      await prisma.programCategory.createMany({
        data: input.categoryIds.map((categoryId) => ({ programId: programId!, categoryId })),
      });
    }
    revalidatePath("/admin/programlar");
    revalidatePath("/");
    return { ok: true };
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2002")
      return { ok: false, error: "Bu slug zaten kullanılıyor." };
    return { ok: false, error: "Kaydedilemedi, alanları kontrol edin." };
  }
}
