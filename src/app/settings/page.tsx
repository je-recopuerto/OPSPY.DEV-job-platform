import { auth } from "@/auth";
import PreferencesForm from "@/components/settings/preferences-form";
import { ProfileForm } from "@/components/settings/profile-form";
import ProfileFormSkeleton from "@/components/settings/profile-form-skeleton";
import { Separator } from "@/components/ui/separator";
import knock from "@/lib/knock";
import { cn } from "@/lib/utils";
import { getUserById, getUserWithCvsById } from "@/services/UserService";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SettingsProfilePage() {
  return (
    <>
      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfilePage />
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        <NotificationsPage className={"mt-6"} />
      </Suspense>
    </>
  );
}

// Server component
async function ProfilePage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserWithCvsById(session.user.id);
  if (!user) return redirect("/t/welcome");

  return (
    <div className="max-w-2xl">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator className={"my-5"} />

      <ProfileForm user={user} />
    </div>
  );
}
async function NotificationsPage({ className }: { className?: string }) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserById(session.user.id);
  if (!user) return redirect("/");

  const preferences = await knock.users.getPreferences(user.id, {
    preferenceSet: "default",
  });

  // Wait 4 seconds
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Control how you want to be notified.
        </p>
      </div>

      <Separator />

      <PreferencesForm preferences={preferences} />
    </div>
  );
}
