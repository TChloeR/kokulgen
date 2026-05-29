"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { OrganizationType, PublishStatus } from "@prisma/client";

export type OrgInput = {
  id?: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  isVerified: boolean;
  description: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  websiteUrl: string;
  logoUrl: string;
  latitude: number | null;
  longitude: number | null;
  metaTitle: string;
  metaDescription: string;
};

export async function saveOrganization(
  input: OrgInput
): Promise<{ ok: boolean; error?: string }> {
  const data = {
    name: input.name,
    slug: input.slug,
    type: input.type as OrganizationType,
    status: input.status as PublishStatus,
    isVerified: input.isVerified,
    description: input.description || null,
    city: input.city || null,
    district: input.district || null,
    address: input.address || null,
    phone: input.phone || null,
    email: input.email || null,
    websiteUrl: input.websiteUrl || null,
    logoUrl: input.logoUrl || null,
    latitude: input.latitude,
    longitude: input.longitude,
    metaTitle: input.metaTitle || null,
    metaDescription: input.metaDescription || null,
  };
  try {
    if (input.id) {
      await prisma.organization.update({ where: { id: input.id }, data });
    } else {
      await prisma.organization.create({ data });
    }
    revalidatePath("/admin/kurumlar");
    revalidatePath("/");
    return { ok: true };
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2002")
      return { ok: false, error: "Bu slug zaten kullanılıyor." };
    return { ok: false, error: "Kaydedilemedi, alanları kontrol edin." };
  }
}
