import { buttonVariants } from "@/components/ui/button";
import { getJobUrl } from "@/lib/utils";
import { JobPostWithCompany } from "@/services/JobService";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type FeaturedJobsProps = {
  jobs: JobPostWithCompany[];
};

export default function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
        Featured Jobs
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                href={getJobUrl(job.id)}
              >
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
