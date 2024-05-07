import RegisterCompany from "@/app/(app)/(employer)/e/register/_components/register-company";
import { auth } from "@/auth";
import { employerHomepageUrl, homeUrl } from "@/lib/pages";
import { canCreateNewCompany } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function CreateCompanyPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    return redirect(employerHomepageUrl);

  if (!(await canCreateNewCompany(session?.user?.id))) {
    return redirect(homeUrl);
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold pb-6">Register your company</h1>
      <RegisterCompany />
    </main>
  );
}
