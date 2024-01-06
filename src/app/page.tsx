import { auth, signIn } from "@/auth";
import { getUserWithCompanyById } from "@/services/UserService";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session || !session.user) return signIn();

  const user = await getUserWithCompanyById(session.user.id);
  if (!user) return;

  const isEmployer = !!user.company;

  if (isEmployer) return redirect("/e/dash");
  return redirect("/t/dash");
}
