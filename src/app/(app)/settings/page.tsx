import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { getUserWithCvsById } from "@/lib/data/user";
import { UserWithCvs } from "@/lib/data/user.types";
import knock from "@/lib/knock";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import PreferencesForm from "./_components/preferences-form";
import { ProfileForm } from "./_components/profile-form";
import ProfileFormSkeleton from "./_components/profile-form-skeleton";

export const metadata = {
  title: "Settings",
};

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/");

  const user = await getUserWithCvsById(session.user.id);
  if (!user) return redirect("/t/welcome");

  return (
    <div className={"space-y-8"}>
      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfilePage user={user} />
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        <NotificationsPage user={user} />
      </Suspense>
    </div>
  );
}

async function ProfilePage({ user }: PageProps) {
  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator className={"mt-3 mb-6"} />

      <ProfileForm user={user} />
    </div>
  );
}

async function NotificationsPage({ user }: PageProps) {
  const preferences = await knock.users.getPreferences(user.id, {
    preferenceSet: "default",
  });

  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Control how you want to be notified.
        </p>
      </div>

      <Separator className={"mt-3 mb-6"} />

      <PreferencesForm preferences={preferences} />
    </div>
  );
}

type PageProps = {
  user: UserWithCvs;
};
