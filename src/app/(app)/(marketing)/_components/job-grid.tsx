import { buttonVariants } from "@/components/ui/button";
import { JobPostWithCompany } from "@/lib/data/job.types";
import { filteredJobsUrl, jobUrl } from "@/lib/pages";
import { Company } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

type FeaturedJobsProps = {
  jobs: JobPostWithCompany[];
  showMore?: boolean;
  companyId?: Company["id"];
};

export default function JobGrid({
  jobs,
  showMore = false,
  companyId,
}: FeaturedJobsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length === 0 && (
          <div className="text-center col-span-full text-muted-foreground text-sm">
            No jobs found. Please try again later.
          </div>
        )}
        {jobs.map((job, key) => (
          <Card key={key}>
            {/*<img*/}
            {/*  alt="Property 1"*/}
            {/*  className="aspect-[5/3] object-cover w-full"*/}
            {/*  height={300}*/}
            {/*  src="/placeholder.svg"*/}
            {/*  width={500}*/}
            {/*/>*/}
            <CardHeader className="flex flex-col gap-1">
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.company.name} ({job.location})
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                ${job.minSalary.toLocaleString()} - $
                {job.maxSalary.toLocaleString()}
              </div>

              <Link
                className={buttonVariants({ variant: "outline" })}
                href={jobUrl(job.id)}
              >
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}

        <div className={"mx-auto my-auto"}>
          {showMore && (
            <Link
              href={filteredJobsUrl({
                cid: companyId,
              })}
              className={buttonVariants({ variant: "ghost" })}
            >
              View More
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
