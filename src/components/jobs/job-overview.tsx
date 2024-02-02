import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { JobPostWithCompany } from "@/services/JobService";
import { JobType } from "@prisma/client";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

type JobListingProps = {
  job: JobPostWithCompany;
  isFollowing: boolean;
  searchParams: URLSearchParams;
};

function JobOverview({ job, isFollowing, searchParams }: JobListingProps) {
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("jid", job.id.toString());

  const jobUrl = `/jobs?${newSearchParams.toString()}`;

  return (
    <Link href={jobUrl}>
      <Card className={"hover:border-white transition-all cursor-pointer"}>
        <CardHeader className={"flex flex-row gap-x-4 space-y-0"}>
          <Avatar className={"h-10 w-10 rounded-sm"}>
            <AvatarImage
              src={job.company.logoUrl ?? "https://github.com/shadcn.png"}
              alt={job.company.name}
              sizes={"cover"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className={"text-md hover:underline"}>
              {job.title}

              {isFollowing && (
                <Badge variant={"outline"} className={"ml-2"}>
                  Saved
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {job.company.name} | {job.location} | {jobTypes[job.type]} |{" "}
              {getSalaryRangeString(job.minSalary, job.maxSalary, job.currency)}
            </CardDescription>
          </div>

          <div>
            <div className={"flex flex-row gap-2"}>
              {job.tags.map((tag) => (
                <Badge key={tag.id} variant={"default"}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p
            className={"text-sm font-normal leading-none text-muted-foreground"}
          >
            {job.description?.slice(0, 125) + "..."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

const jobTypes: Record<JobType, string> = {
  [JobType.FULL_TIME]: "Full Time",
  [JobType.PART_TIME]: "Part Time",
  [JobType.CONTRACT]: "Contract",
  [JobType.INTERNSHIP]: "Internship",
};

function JobOverviewSkeleton() {
  return (
    <Card>
      <CardHeader className={"flex flex-row gap-x-4 space-y-0"}>
        <Skeleton className="h-10 w-10 rounded-sm" />

        <div>
          <div className={"flex flex-col gap-2"}>
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div>
          <div className={"flex flex-row gap-2"}>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardHeader>

      <CardContent className={"flex flex-col gap-2"}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );
}

export { JobOverview, JobOverviewSkeleton };

function getSalaryRangeString(
  minSalary: number,
  maxSalary: number,
  currencyCode?: string,
) {
  const currencySymbol = getSymbolFromCurrency(currencyCode ?? "USD");

  if (minSalary === maxSalary)
    return `${currencySymbol}${formatCurrency(minSalary)}`;

  return `${currencySymbol}${formatCurrency(
    minSalary,
  )} - ${currencySymbol}${formatCurrency(maxSalary)}`;
}

// 1234567.89 => "1,234,567.89"
function formatCurrency(num: number): string {
  // return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatToKForm(num);
}

function formatToKForm(num: number): string {
  // Check if the number is less than 1000
  if (num < 1000) {
    return num.toString();
  }

  // Round the number to nearest thousand and append 'k'
  return `${Math.round(num / 1000)}k`;
}

// Example usage
// const formattedNumber = formatToKForm(50000); // Outputs: '50k'
// console.log(formattedNumber);

function getSymbolFromCurrency(currencyCode: string) {
  return currencyCode
    .replace("USD", "$")
    .replace("EUR", "€")
    .replace("GBP", "£");
}
