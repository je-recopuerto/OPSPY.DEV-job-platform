import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "@/components/settings/profile-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/services/UserService";

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserById(session.user.id);
  if (!user) return redirect("/");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
