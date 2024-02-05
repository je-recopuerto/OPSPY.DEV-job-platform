"use server";

import { signIn } from "@/auth";

export async function signInAuth(provider: string) {
  return await signIn(provider);
}
