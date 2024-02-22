-- CreateEnum
CREATE TYPE "PayInterval" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "JobPost" ADD COLUMN     "interval" "PayInterval" NOT NULL DEFAULT 'YEARLY';
