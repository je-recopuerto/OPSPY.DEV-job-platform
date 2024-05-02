"use server";

import { auth } from "@/auth";
import { createServerAction, ServerActionError } from "@/lib/action-utils";
import knock from "@/lib/knock";
import { PreferenceSet } from "@knocklabs/node";

export const updateNotificationSettings = createServerAction(
  async (preferences: PreferenceSet) => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) return;

    console.log("Updating notification settings for user", session.user.id);

    try {
      return await knock.users.setPreferences(session.user.id, preferences);
    } catch (e) {
      throw new ServerActionError(
        "Failed to update notification settings. Please try again later",
      );
    }
  },
);
