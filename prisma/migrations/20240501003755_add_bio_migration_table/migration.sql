/*
  Warnings:

  - You are about to drop the column `bioCompletions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastBioReset` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bioCompletions",
DROP COLUMN "lastBioReset";

-- CreateTable
CREATE TABLE "BioGeneration" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "BioGeneration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BioGeneration" ADD CONSTRAINT "BioGeneration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
