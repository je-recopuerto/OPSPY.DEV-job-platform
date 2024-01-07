import { auth } from "@/auth";
import PreferencesForm from "@/components/settings/preferences-form";
import { Separator } from "@/components/ui/separator";
import knock from "@/lib/knock";
import { getUserById } from "@/services/UserService";
import { redirect } from "next/navigation";

export default async function NotificationsPage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserById(session.user.id);
  if (!user) return redirect("/");

  const preferences = await knock.users.getPreferences(user.id, {
    preferenceSet: "default",
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Control how you want to be notified.
        </p>
      </div>

      <Separator />

      <PreferencesForm preferences={preferences} />
    </div>
  );
}
