-- DropForeignKey
ALTER TABLE "JobTracker" DROP CONSTRAINT "JobTracker_jobId_fkey";

-- AddForeignKey
ALTER TABLE "JobTracker" ADD CONSTRAINT "JobTracker_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
