import { auth } from "@/auth";
import CompanyProfile from "@/components/jobs/company-profile";
import CreateJobForm from "@/components/jobs/create-job-form";
import { Separator } from "@/components/ui/separator";
import { getUserWithCompanyById } from "@/services/UserService";
import { redirect } from "next/navigation";

export default async function NewJobPage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserWithCompanyById(session.user.id);
  if (!user) return;
  if (!user.company) return redirect("/");

  return (
    <main className="flex flex-col max-w-3xl m-auto px-14 pb-[14rem]">
      <CompanyProfile company={user.company} />

      <Separator className={"my-8"} />

      <h1 className="text-2xl font-semibold pb-6">Create a new job</h1>

      <CreateJobForm />
    </main>
  );
}
