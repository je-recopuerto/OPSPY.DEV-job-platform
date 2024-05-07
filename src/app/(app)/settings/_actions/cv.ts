"use server";

import { auth } from "@/auth";
import { env } from "@/env.mjs";
import { createServerAction, ServerActionError } from "@/lib/action-utils";
import { deleteFile, getExpirableUrlFor, uploadFile } from "@/lib/blob";
import { cvTag } from "@/lib/cache-tags";
import { getCvById, getUserById, getUserWithCvsById } from "@/lib/data/user";
import prisma from "@/lib/db";
import { fileSizeToBytes } from "@/lib/utils";
import { UploadedCv } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export async function deleteCv(cvId: UploadedCv["id"]) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return;

  const user = await getUserById(session.user.id);
  if (!user) return;

  const cv = await getCvById(cvId);
  if (!cv) return;

  console.log("Deleting cv", cvId, "for user", user.id);

  const _ = await deleteFile("cvs", cv.fileName);

  await prisma.uploadedCv.delete({
    where: {
      id: cvId,
    },
  });

  revalidateTag(cvTag);
}

export const uploadCv = createServerAction(async (formData: FormData) => {
  const cv = formData.get("cv") as File;
  const buffer = await cv.arrayBuffer();

  const maxSize = env.NEXT_PUBLIC_MAX_CV_FILE_SIZE ?? "10MB";
  if (buffer.byteLength > fileSizeToBytes(maxSize)) {
    throw new ServerActionError(
      `File is too large. Please upload a file under ${maxSize}`,
    );
  }

  if (!cv) throw new ServerActionError("Please attach a file.");

  const user = await auth().then((session) =>
    getUserWithCvsById(session?.user?.id),
  );
  if (!user) throw new ServerActionError("User not found");

  // Upload cv to blob storage
  const blobName = uuidv4() + cv.name;
  const response = await uploadFile(
    "cvs",
    Buffer.from(buffer),
    cv.type,
    blobName,
  );

  // Create cv object on user
  const result = await prisma.uploadedCv.create({
    data: {
      friendlyName: cv.name,
      fileName: blobName,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  revalidatePath("/settings/profile");
});

export const requestCvUrl = createServerAction(
  async (cvId: UploadedCv["id"]) => {
    const user = await auth().then((session) => getUserById(session?.user?.id));
    if (!user) throw new ServerActionError("User not found");

    const cv = await getCvById(cvId);
    if (!cv) throw new ServerActionError("CV not found");

    // Expires in 1hour = 60 (minutes) * 60 (seconds)
    return await getExpirableUrlFor("cvs", cv.fileName, 60 * 60);
  },
);
