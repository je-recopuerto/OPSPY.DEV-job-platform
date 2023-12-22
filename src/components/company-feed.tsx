import { getCompaniesWithOpenings } from "@/services/companyService";
import CompanyProfileWithOpenings from "@/components/jobs/company-profile-with-openings";

export default async function CompanyFeed() {
  const companies = await getCompaniesWithOpenings();

  return (
    <>
      <h1 className="text-2xl font-semibold pb-6">
        Explore Companies ({companies.length})
      </h1>

      <div className={"flex flex-col gap-y-3"}>
        {companies.map((company) => (
          <CompanyProfileWithOpenings company={company} key={company.id} />
        ))}
      </div>
    </>
  );
}
