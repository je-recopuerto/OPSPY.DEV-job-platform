/*
  Warnings:

  - Added the required column `currency` to the `JobPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSalary` to the `JobPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minSalary` to the `JobPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `JobPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'INR');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- AlterTable
ALTER TABLE "JobPost" ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "maxSalary" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "minSalary" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "JobType" NOT NULL;
