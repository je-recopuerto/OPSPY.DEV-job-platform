/*
  Warnings:

  - You are about to drop the column `remote` on the `JobPost` table. All the data in the column will be lost.
  - You are about to drop the `JobApplication` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isRemote` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_userId_fkey";

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "remote",
ADD COLUMN     "externalLink" TEXT,
ADD COLUMN     "isExternalOnly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRemote" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "JobApplication";
