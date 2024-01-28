/*
  Warnings:

  - The primary key for the `JobApplication` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JobApplication_id_seq";
