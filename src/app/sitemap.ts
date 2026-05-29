import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://kokulgen.com";

  const [categories, programs] = await Promise.all([
    prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.aidProgram.findMany({
      where: { status: "YAYINDA" },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/ara`, lastModified: new Date(), priority: 0.8 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/kategori/${c.slug}`,
    lastModified: c.updatedAt,
    priority: 0.7,
  }));

  const programPages: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${base}/yardim/${p.slug}`,
    lastModified: p.updatedAt,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...programPages];
}
