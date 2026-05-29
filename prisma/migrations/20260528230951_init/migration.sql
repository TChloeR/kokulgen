-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('VAKIF', 'DERNEK', 'STK', 'DEVLET_KURUMU', 'SIRKET', 'BELEDIYE');

-- CreateEnum
CREATE TYPE "ApplicationMethod" AS ENUM ('ONLINE', 'YUZ_YUZE', 'HER_IKISI', 'TELEFON');

-- CreateEnum
CREATE TYPE "TemplateFormat" AS ENUM ('WORD', 'PDF', 'HER_IKISI');

-- CreateEnum
CREATE TYPE "PublishStatus" AS ENUM ('TASLAK', 'YAYINDA', 'ARSIV');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "iconName" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "description" TEXT,
    "logoUrl" TEXT,
    "websiteUrl" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "district" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "status" "PublishStatus" NOT NULL DEFAULT 'TASLAK',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AidProgram" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "details" TEXT NOT NULL,
    "conditions" TEXT NOT NULL,
    "applicationMethod" "ApplicationMethod" NOT NULL,
    "onlineApplicationUrl" TEXT,
    "applicationAddress" TEXT,
    "applicationLatitude" DOUBLE PRECISION,
    "applicationLongitude" DOUBLE PRECISION,
    "applicationStartDate" TIMESTAMP(3),
    "applicationDeadline" TIMESTAMP(3),
    "isAlwaysOpen" BOOLEAN NOT NULL DEFAULT false,
    "status" "PublishStatus" NOT NULL DEFAULT 'TASLAK',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AidProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramCategory" (
    "programId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgramCategory_pkey" PRIMARY KEY ("programId","categoryId")
);

-- CreateTable
CREATE TABLE "RequiredDocument" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "programId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequiredDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetitionTemplate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "format" "TemplateFormat" NOT NULL,
    "wordFileUrl" TEXT,
    "pdfFileUrl" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "programId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetitionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_orderIndex_idx" ON "Category"("orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_slug_idx" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Organization_type_idx" ON "Organization"("type");

-- CreateIndex
CREATE INDEX "Organization_city_idx" ON "Organization"("city");

-- CreateIndex
CREATE INDEX "Organization_status_idx" ON "Organization"("status");

-- CreateIndex
CREATE UNIQUE INDEX "AidProgram_slug_key" ON "AidProgram"("slug");

-- CreateIndex
CREATE INDEX "AidProgram_slug_idx" ON "AidProgram"("slug");

-- CreateIndex
CREATE INDEX "AidProgram_organizationId_idx" ON "AidProgram"("organizationId");

-- CreateIndex
CREATE INDEX "AidProgram_status_idx" ON "AidProgram"("status");

-- CreateIndex
CREATE INDEX "AidProgram_applicationDeadline_idx" ON "AidProgram"("applicationDeadline");

-- CreateIndex
CREATE INDEX "ProgramCategory_categoryId_idx" ON "ProgramCategory"("categoryId");

-- CreateIndex
CREATE INDEX "ProgramCategory_programId_idx" ON "ProgramCategory"("programId");

-- CreateIndex
CREATE INDEX "RequiredDocument_programId_idx" ON "RequiredDocument"("programId");

-- CreateIndex
CREATE INDEX "PetitionTemplate_programId_idx" ON "PetitionTemplate"("programId");

-- AddForeignKey
ALTER TABLE "AidProgram" ADD CONSTRAINT "AidProgram_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramCategory" ADD CONSTRAINT "ProgramCategory_programId_fkey" FOREIGN KEY ("programId") REFERENCES "AidProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramCategory" ADD CONSTRAINT "ProgramCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequiredDocument" ADD CONSTRAINT "RequiredDocument_programId_fkey" FOREIGN KEY ("programId") REFERENCES "AidProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetitionTemplate" ADD CONSTRAINT "PetitionTemplate_programId_fkey" FOREIGN KEY ("programId") REFERENCES "AidProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
