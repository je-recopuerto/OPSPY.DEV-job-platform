"use server";

import { auth } from "@/auth";
import knock from "@/lib/knock";
import { PreferenceSet } from "@knocklabs/node";

export async function updateNotificationSettings(preferences: PreferenceSet) {
  // TODO: Not working
  const session = await auth();
  if (!session || !session.user) return;

  console.log(
    "Updating notification settings for user",
    session.user.id,
    preferences,
  );

  const result = await knock.users.setPreferences(session.user.id, preferences);

  console.log("Result", result);

  return result;
}
