import { auth } from "@/auth";
import { ProfileForm } from "@/components/settings/profile-form";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/services/UserService";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
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
