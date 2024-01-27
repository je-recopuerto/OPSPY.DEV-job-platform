"use server";

import { auth } from "@/auth";
import { cvTag } from "@/lib/cache-tags";
import prisma from "@/lib/db";
import knock from "@/lib/knock";
import { fileSizeToBytes } from "@/lib/utils";
import {
  bioSchema,
  updateProfileFormSchema,
} from "@/schemas/updateProfileSchema";
import {
  deleteFile,
  getExpirableUrlFor,
  getUrlFor,
  uploadFile,
} from "@/services/BlobService";
import { improveBio } from "@/services/OpemAiService";
import {
  getCvById,
  getUserById,
  getUserWithCvsById,
} from "@/services/UserService";
import { PreferenceSet } from "@knocklabs/node";
import { UploadedCv } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { RateLimitError } from "openai";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

export async function getEnhancedBio(bio: string): Promise<{
  data?: string;
  error?: string;
}> {
  const response = bioSchema.safeParse(bio);
  if (!response.success) {
    return {
      error: response.error.message,
    };
  }

  if (!response.data) throw new Error("No data in zod parse response");

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      error: "User not found",
    };
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return {
      error: "User not found",
    };
  }

  try {
    const result = await improveBio(response.data);
    return {
      data: result,
    };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return {
        error:
          "OpenAI rate limit exceeded - This is an issue with our site. Please try again later.",
      };
    } else if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  }

  return {
    error: "Unknown error",
  };
}

export async function updateNotificationSettings(preferences: PreferenceSet) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return;

  console.log(
    "Updating notification settings for user",
    session.user.id,
    preferences,
  );

  return await knock.users.setPreferences(session.user.id, preferences);
}

export async function deleteCv(cvId: UploadedCv["id"]) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return;

  const user = await getUserById(session.user.id);
  if (!user) return;

  const cv = await getCvById(cvId);
  if (!cv) return;

  console.log("Deleting cv", cvId, "for user", user.id);

  console.log("Deleting cv from blob storage:", cv.fileName);
  const result = await deleteFile("cvs", cv.fileName);
  if (result.errorCode) {
    console.error("Failed to delete cv from blob storage", result);
  }

  await prisma.uploadedCv.delete({
    where: {
      id: cvId,
    },
  });

  revalidateTag(cvTag);
}

export async function updateProfile(
  values: z.infer<typeof updateProfileFormSchema>,
) {
  console.log("Updating profile");

  // This will throw an error if the state is invalid
  const validatedState = updateProfileFormSchema.parse(values);

  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");

  console.log("Updating profile:", validatedState, "for user:", user);

  const result = await prisma.user.upsert({
    where: {
      id: user.id,
    },
    create: {
      id: user.id,
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      bio: validatedState.bio,
      email: validatedState.email,
      githubLink: validatedState.githubLink,
      linkedinLink: validatedState.linkedInLink,
      twitterLink: validatedState.twitterLink,
      workExperience: {
        create: [
          ...(validatedState.workExperience ?? []).map((experience) => ({
            title: experience.jobTitle,
            company: experience.company,
            location: experience.location,
            startDate: experience.startDate,
            endDate: experience.endDate,
            description: experience.description,
          })),
        ],
      },
    },
    update: {
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      bio: validatedState.bio,
      email: validatedState.email,
      githubLink: validatedState.githubLink,
      linkedinLink: validatedState.linkedInLink,
      twitterLink: validatedState.twitterLink,
      workExperience: {
        deleteMany: {},
        create: [
          ...(validatedState.workExperience ?? []).map((experience) => ({
            title: experience.jobTitle,
            company: experience.company,
            location: experience.location,
            startDate: experience.startDate,
            endDate: experience.endDate,
            description: experience.description,
          })),
        ],
      },
    },
  });

  revalidatePath("/settings/profile");

  console.log("Successfully updated", user.firstName, "profile.");
  return result;
}

export async function uploadCv(formData: FormData) {
  const cv = formData.get("cv") as File;
  const buffer = await cv.arrayBuffer();

  const maxSize = process.env.NEXT_PUBLIC_MAX_CV_FILE_SIZE ?? "10MB";
  console.log(
    "Got file of length",
    buffer.byteLength,
    "bytes with max size",
    fileSizeToBytes(maxSize),
  );
  if (buffer.byteLength > fileSizeToBytes(maxSize)) {
    throw new Error(`File is too large. Please upload a file under ${maxSize}`);
  }

  console.log("Uploading cv", cv, buffer);

  if (!cv) throw new Error("No CV found in form");

  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

  const user = await getUserWithCvsById(session.user.id);
  if (!user) throw new Error("User not found");

  // Upload cv to blob storage
  const blobName = uuidv4() + cv.name;
  const _ = await uploadFile("cvs", buffer, cv.type, blobName);

  console.log("Uploading cv to blob storage");

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

  console.log(user, "is uploading cv", cv, "with result:", result);
}

export async function requestCvUrl(cvId: UploadedCv["id"]) {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");

  const cv = await getCvById(cvId);
  if (!cv) throw new Error("CV not found");

  console.log("Requesting cv url for", cvId, "for user", user.id);

  const expiresAt = new Date(new Date().valueOf() + 60 * 60 * 1000); // 1 hour from now
  return getExpirableUrlFor("cvs", cv.fileName, expiresAt);
}

export async function uploadProfilePicture(formData: FormData) {
  console.log("Uploading profile picture");

  const session = await auth();
  if (!session || !session.user || !session.user.id)
    throw new Error("User not found");

  const user = await getUserById(session.user.id);
  if (!user) throw new Error("User not found");

  console.log("Uploading profile picture for user:", user);

  const picture = formData.get("profilePicture") as File;
  const buffer = await picture.arrayBuffer();

  const maxSize = process.env.NEXT_PUBLIC_MAX_PROFILE_PICTURE_SIZE ?? "10MB";
  if (buffer.byteLength > fileSizeToBytes(maxSize)) {
    throw new Error(`File is too large. Please upload a file under ${maxSize}`);
  }

  const fileName = uuidv4() + picture.name;
  const blobResponse = await uploadFile(
    "profile-pictures",
    buffer,
    picture.type,
    fileName,
  );

  const blobUrl = getUrlFor("profile-pictures", fileName);

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      imageURL: blobUrl,
    },
  });

  revalidatePath("/settings/profile");

  console.log("Successfully uploaded profile picture for", user.firstName);
  return result;
}
