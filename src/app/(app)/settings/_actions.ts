"use server";

import { auth } from "@/auth";
import { env } from "@/env.mjs";
import { getStaticUrlFor, uploadFile } from "@/lib/blob";
import { getUserById } from "@/lib/data/user";
import prisma from "@/lib/db";
import { fileSizeToBytes } from "@/lib/utils";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

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

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      bio: validatedState.bio,
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

  const maxSize = env.NEXT_PUBLIC_MAX_PROFILE_PICTURE_SIZE ?? "10MB";
  if (buffer.byteLength > fileSizeToBytes(maxSize)) {
    throw new Error(`File is too large. Please upload a file under ${maxSize}`);
  }

  const fileName = uuidv4() + picture.name;
  const response = await uploadFile(
    "profile-pictures",
    Buffer.from(buffer),
    picture.type,
    fileName,
  );

  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      image: getStaticUrlFor(fileName).toString(),
    },
  });

  revalidatePath("/settings/profile");

  console.log("Successfully uploaded profile picture for", user.firstName);
  return result;
}
