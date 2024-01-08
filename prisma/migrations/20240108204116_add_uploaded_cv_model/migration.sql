-- CreateTable
CREATE TABLE "UploadedCv" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "UploadedCv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadedCv_userId_key" ON "UploadedCv"("userId");

-- AddForeignKey
ALTER TABLE "UploadedCv" ADD CONSTRAINT "UploadedCv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
