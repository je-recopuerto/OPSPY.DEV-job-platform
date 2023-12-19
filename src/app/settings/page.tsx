import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/settings/profile-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getProfileByUserId } from "@/services/userService";

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session) return redirect("/");

  const profile = await getProfileByUserId(session.user.id);
  if (!profile) return redirect("/");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm profile={profile} />
    </div>
  );
}
