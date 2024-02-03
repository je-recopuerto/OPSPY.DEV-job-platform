import JobGrid from "@/components/home/job-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanyById } from "@/lib/data/company";
import { getJobPostsByCompanyId } from "@/lib/data/job";
import { cn } from "@/lib/utils";
import { Company } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type CompanyPageParams = {
  params: { companyId: string };
};

export async function generateMetadata(
  { params }: CompanyPageParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const companyId = decodeURI(params.companyId);
  const company = await getCompanyById(companyId);

  console.log(companyId);
  console.log(company);
  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: company.name,
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default async function CompanyPage({ params }: CompanyPageParams) {
  const companyId = decodeURI(params.companyId);
  const company = await getCompanyById(companyId);
  if (!company) return notFound();

  const bannerUrl = "https://placehold.co/1400x270/svg?text=Banner";
  // const bannerUrl = undefined;

  return (
    <div className={"container"}>
      <Banner image={bannerUrl} />

      <div className={bannerUrl ? "relative -mt-12 px-4 sm:px-6 lg:px-8 " : ""}>
        <div className={"flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-4"}>
          <BasicInfo company={company} />
          <Overview company={company} className={"col-span-3"} />
        </div>
        <div className={"mt-8"}>
          <Openings company={company} count={5} />
        </div>
      </div>
    </div>
  );
}

const Openings = ({ company, count }: { company: Company; count?: number }) => {
  return (
    <>
      <h2 className={"text-2xl font-semibold mb-4"}>Openings</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <OpeningsAsync companyId={company.id} count={count} />
      </Suspense>
    </>
  );
};

const OpeningsAsync = async ({
  companyId,
  count,
}: {
  companyId: Company["id"];
  count?: number;
}) => {
  const { jobs, areMore } = await getJobPostsByCompanyId(companyId, count);

  return <JobGrid jobs={jobs} showMore={areMore} companyId={companyId} />;
};

const BasicInfo = ({ company }: { company: Company }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{company.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className={"flex flex-col gap-y-2 text-sm list-disc list-inside"}>
          <li>Founded: 2012</li>
          <li>Size: 12,000+</li>
          <li>Industry: Software</li>
          <li>Location: London, UK</li>
        </ul>
      </CardContent>
    </Card>
  );
};

const Banner = ({ image }: { image?: string }) => {
  if (!image) return null;

  return (
    <div
      className={"w-full h-96 bg-cover bg-center"}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

const Overview = ({
  company,
  className,
}: {
  company: Company;
  className?: string;
}) => {
  return (
    <Card className={cn(className, "")}>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {company.description ? (
          <p>{company.description}</p>
        ) : (
          <p className={"text-muted-foreground italic text-sm"}>
            No description available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
