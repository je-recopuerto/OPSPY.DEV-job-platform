/*
  Warnings:

  - The primary key for the `JobPost` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobTracker" DROP CONSTRAINT "JobTracker_jobId_fkey";

-- DropForeignKey
ALTER TABLE "_JobPostToTag" DROP CONSTRAINT "_JobPostToTag_A_fkey";

-- AlterTable
ALTER TABLE "JobApplication" ALTER COLUMN "jobId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "JobPost" DROP CONSTRAINT "JobPost_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JobPost_id_seq";

-- AlterTable
ALTER TABLE "JobTracker" ALTER COLUMN "jobId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_JobPostToTag" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTracker" ADD CONSTRAINT "JobTracker_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobPostToTag" ADD CONSTRAINT "_JobPostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
