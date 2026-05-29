/*
  Warnings:

  - You are about to drop the column `sourceUrl` on the `RequiredDocument` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RequiredDocument" DROP COLUMN "sourceUrl",
ADD COLUMN     "sourceLinks" JSONB;
