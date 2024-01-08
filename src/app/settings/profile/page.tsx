import { auth } from "@/auth";
import { ProfileForm } from "@/components/settings/profile-form";
import { getUserById } from "@/services/UserService";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserById(session.user.id);
  if (!user) return redirect("/");

  return <ProfileForm user={user} />;
}
