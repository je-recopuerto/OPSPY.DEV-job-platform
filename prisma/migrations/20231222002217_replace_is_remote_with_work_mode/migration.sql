/*
  Warnings:

  - You are about to drop the column `isRemote` on the `JobPost` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WorkMode" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "isRemote",
ADD COLUMN     "workMode" "WorkMode" NOT NULL DEFAULT 'ONSITE';
