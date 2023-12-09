import {getCompanies} from "@/services/companyService";

export default async function CompanyFeed() {

  const companies = await getCompanies();

  return (
    <>
      {companies.map((company) => (
        <div className={"whitespace-pre-wrap"}>
          {JSON.stringify(company, null, 2)}
        </div>
      ))}
    </>
  )
}