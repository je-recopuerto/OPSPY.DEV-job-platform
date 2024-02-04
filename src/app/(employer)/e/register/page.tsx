import RegisterCompany from "@/app/(employer)/e/register/_components/register-company";
import { canCreateNewCompany } from "@/app/_actions";
import { auth } from "@/auth";
import { employerHomepageUrl } from "@/lib/pages";
import { redirect } from "next/navigation";

export default async function CreateCompanyPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    return redirect(employerHomepageUrl);

  const response = await canCreateNewCompany(session?.user?.id);
  if (!response.authorized) return redirect(employerHomepageUrl);

  const { user } = response.data;

  return (
    <main className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold pb-6">Register your company</h1>

      <RegisterCompany />
    </main>
  );
}
