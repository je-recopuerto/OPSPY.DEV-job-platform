import {getCompaniesWithOpenings} from "@/services/companyService";
import CompanyProfile from "@/components/job-listing/company-profile";

export default async function CompanyFeed() {
  const companies = await getCompaniesWithOpenings();

  return (
    <>
      <h1 className="text-2xl font-semibold pb-6">Explore Companies ({companies.length})</h1>

      <div className={"flex flex-col gap-y-3"}>
        {companies.map((company) => (
          <CompanyProfile company={company} key={company.id}/>
        ))}
      </div>
    </>
  )
}