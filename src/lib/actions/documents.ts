"use server";

import { Prisma, TemplateFormat } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type SourceLink = { label: string; url: string };

export type DocInput = {
  id?: string;
  programId: string;
  name: string;
  description: string;
  isMandatory: boolean;
  orderIndex: number;
  sourceLinks: SourceLink[];
};

export async function saveDocument(
  input: DocInput
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const data = {
      programId: input.programId,
      name: input.name,
      description: input.description || null,
      isMandatory: input.isMandatory,
      orderIndex: input.orderIndex,
      sourceLinks: input.sourceLinks as unknown as Prisma.InputJsonValue,
    };
    let id = input.id;
    if (input.id) {
      await prisma.requiredDocument.update({ where: { id: input.id }, data });
    } else {
      const c = await prisma.requiredDocument.create({ data });
      id = c.id;
    }
    revalidatePath("/", "layout");
    return { ok: true, id };
  } catch {
    return { ok: false, error: "Belge kaydedilemedi." };
  }
}

export async function deleteDocument(id: string): Promise<{ ok: boolean }> {
  try {
    await prisma.requiredDocument.delete({ where: { id } });
    revalidatePath("/", "layout");
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export type TemplateInput = {
  id?: string;
  programId: string;
  title: string;
  description: string;
  format: string;
  wordFileUrl: string;
  pdfFileUrl: string;
  version: string;
};

export async function savePetitionTemplate(
  input: TemplateInput
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const data = {
      programId: input.programId,
      title: input.title,
      description: input.description || null,
      format: input.format as TemplateFormat,
      wordFileUrl: input.wordFileUrl || null,
      pdfFileUrl: input.pdfFileUrl || null,
      version: input.version || "1.0",
    };
    let id = input.id;
    if (input.id) {
      await prisma.petitionTemplate.update({ where: { id: input.id }, data });
    } else {
      const c = await prisma.petitionTemplate.create({ data });
      id = c.id;
    }
    revalidatePath("/", "layout");
    return { ok: true, id };
  } catch {
    return { ok: false, error: "Şablon kaydedilemedi." };
  }
}

export async function deletePetitionTemplate(id: string): Promise<{ ok: boolean }> {
  try {
    await prisma.petitionTemplate.delete({ where: { id } });
    revalidatePath("/", "layout");
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
