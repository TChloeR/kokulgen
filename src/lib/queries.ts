import { prisma } from "@/lib/prisma";

// Anasayfa için: tüm kategoriler, sıralı
export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { orderIndex: "asc" },
  });
}

// Kategori detay sayfası için: kategori + o kategorideki yayında olan programlar + kurumları
export async function getCategoryWithPrograms(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      programs: {
        where: { program: { status: "YAYINDA" } },
        include: {
          program: {
            include: { organization: true },
          },
        },
      },
    },
  });
}

// SEO: statik sayfa üretimi için tüm kategori slug'ları
export async function getAllCategorySlugs() {
  const cats = await prisma.category.findMany({ select: { slug: true } });
  return cats.map((c) => c.slug);
}
// Program detay sayfası için: program + kurum + kategoriler + belgeler + dilekçeler
export async function getProgramBySlug(slug: string) {
  return prisma.aidProgram.findUnique({
    where: { slug },
    include: {
      organization: true,
      categories: { include: { category: true } },
      requiredDocuments: { orderBy: { orderIndex: "asc" } },
      petitionTemplates: true,
    },
  });
}

// SEO: tüm yayında olan program slug'ları (statik üretim için)
export async function getAllProgramSlugs() {
  const programs = await prisma.aidProgram.findMany({
    where: { status: "YAYINDA" },
    select: { slug: true },
  });
  return programs.map((p) => p.slug);
}

export async function getOrganizations() {
  return prisma.organization.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { programs: true } } },
  });
}

export async function getOrganizationById(id: string) {
  return prisma.organization.findUnique({ where: { id } });
}

export async function getProgramsAdmin() {
  return prisma.aidProgram.findMany({
    orderBy: { createdAt: "desc" },
    include: { organization: { select: { name: true } } },
  });
}

export async function getProgramByIdAdmin(id: string) {
  return prisma.aidProgram.findUnique({
    where: { id },
    include: { categories: { select: { categoryId: true } } },
  });
}

export async function getOrganizationsForSelect() {
  return prisma.organization.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

export async function getCategoriesForSelect() {
  return prisma.category.findMany({
    orderBy: { orderIndex: "asc" },
    select: { id: true, name: true },
  });
}

export async function getDistinctCities() {
  const rows = await prisma.organization.findMany({
    where: { city: { not: null }, programs: { some: { status: "YAYINDA" } } },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
  return rows.map((r) => r.city).filter((c): c is string => !!c);
}

export async function searchPrograms(opts: {
  q?: string;
  categorySlug?: string;
  city?: string;
  type?: string;
}) {
  const { q, categorySlug, city, type } = opts;
  return prisma.aidProgram.findMany({
    where: {
      status: "YAYINDA",
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { summary: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        categorySlug
          ? { categories: { some: { category: { slug: categorySlug } } } }
          : {},
        city ? { organization: { city } } : {},
        type ? { organization: { type: type as never } } : {},
      ],
    },
    include: { organization: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategoriesAdmin() {
  return prisma.category.findMany({
    orderBy: { orderIndex: "asc" },
    include: { _count: { select: { programs: true } } },
  });
}

export async function getCategoryByIdAdmin(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function getProgramDocsTemplates(programId: string) {
  return prisma.aidProgram.findUnique({
    where: { id: programId },
    select: {
      id: true,
      title: true,
      requiredDocuments: { orderBy: { orderIndex: "asc" } },
      petitionTemplates: { orderBy: { createdAt: "asc" } },
    },
  });
}