import CreateJobForm from "@/components/jobs/create-job-form";
import { getUserWithCompanyById } from "@/services/userService";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function NewJobPage() {
  const session = await auth();
  if (!session) return redirect("/");

  const user = await getUserWithCompanyById(session.user.id);
  if (!user) return;
  if (!user.company) return redirect("/");

  return (
    <main className="flex flex-col max-w-3xl m-auto p-14">
      <CreateJobForm />
    </main>
  );
}
