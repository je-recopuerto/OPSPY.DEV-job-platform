"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { getUserById } from "@/services/UserService";
import * as z from "zod";

export async function updateProfile(
  values: z.infer<typeof updateProfileFormSchema>,
) {
  console.log("Updating profile");

  // This will throw an error if the state is invalid
  const validatedState = updateProfileFormSchema.parse(values);

  const session = await auth();
  if (!session || !session.user) throw new Error("User not found");

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
      email: validatedState.email,
    },
    update: {
      firstName: validatedState.firstName,
      lastName: validatedState.lastName,
      dateOfBirth: validatedState.dateOfBirth,
      email: validatedState.email,
    },
  });

  console.log("Successfully updated", user.firstName, "profile.");
  return result;
}
