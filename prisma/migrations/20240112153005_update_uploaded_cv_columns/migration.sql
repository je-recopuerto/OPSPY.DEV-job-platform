/*
  Warnings:

  - You are about to drop the column `file` on the `UploadedCv` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UploadedCv` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `UploadedCv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UploadedCv" DROP COLUMN "file",
DROP COLUMN "name",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "friendlyName" TEXT NOT NULL DEFAULT 'CV';
