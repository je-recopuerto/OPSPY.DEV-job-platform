-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_jobId_fkey";

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
