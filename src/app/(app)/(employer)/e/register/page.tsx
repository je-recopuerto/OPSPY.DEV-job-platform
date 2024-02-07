import RegisterCompany from "@/app/(app)/(employer)/e/register/_components/register-company";
import { canCreateNewCompany, CreateNewJobErrors } from "@/app/_actions";
import { auth } from "@/auth";
import {
  employerDashboardUrl,
  employerHomepageUrl,
  homeUrl,
  loginUrl,
} from "@/lib/pages";
import { redirect } from "next/navigation";

export default async function CreateCompanyPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    return redirect(employerHomepageUrl);

  const response = await canCreateNewCompany(session?.user?.id);
  if (!response.authorized) {
    const {
      data: { error },
    } = response;

    const redirectUrl = getRedirectUrl(error);
    return redirect(redirectUrl);
  }

  const { user } = response.data;

  return (
    <main className="min-h-screen max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold pb-6">Register your company</h1>

      <RegisterCompany />
    </main>
  );
}

function getRedirectUrl(error: CreateNewJobErrors) {
  console.log("error", error);
  switch (error) {
    case "NO_USER":
      return loginUrl;
    case "HAS_COMPANY":
      return employerDashboardUrl;
    case "UNVERIFIED_COMPANY":
      return employerDashboardUrl;
    default:
      return homeUrl;
  }
}
