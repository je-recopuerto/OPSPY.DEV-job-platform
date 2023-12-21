"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSaveJob } from "@/app/actions";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ApplyJobDialog from "@/components/jobs/apply-job-dialog";
import { JobPostWithCompany } from "@/services/JobService";

type JobListingProps = {
  job: JobPostWithCompany;
  isFollowing: boolean;
};

export default function JobListing(props: JobListingProps) {
  return (
    <Card className={"w-full"}>
      <CardHeader className={"flex flex-row gap-x-3 space-y-0"}>
        <Avatar className={"h-10 w-10"}>
          <AvatarImage
            src={props.job.company.logoUrl ?? "https://github.com/shadcn.png"}
            alt={props.job.company.name}
            sizes={"cover"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div>
          <CardTitle className={"text-md"}>
            <Link href={`/jobs/${props.job.id}`}>{props.job.title}</Link>
          </CardTitle>
          <CardDescription>
            {props.job.company.name} | {props.job.location}
          </CardDescription>
        </div>

        <div>
          <div className={"flex flex-row gap-2"}>
            {props.job.tags.map((tag) => (
              <Badge key={tag.id} variant={"default"}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className={"flex flex-row gap-6 pb-4"}>
          <div>
            <small className="text-sm font-bold leading-none">
              Description
            </small>
            <p
              className={
                "text-sm font-normal leading-none text-muted-foreground"
              }
            >
              {props.job.description?.slice(0, 250)}
            </p>
          </div>

          <div className={"min-w-[6rem]"}>
            <small className="text-sm font-bold leading-none">Salary</small>
            <p className="text-sm font-normal leading-none text-muted-foreground">
              {getSalaryRangeString(
                props.job.minSalary,
                props.job.maxSalary,
                props.job.currency,
              )}
            </p>
          </div>
        </div>

        <div className={"flex flex-row gap-4 p-1"}>
          <ApplyJobDialog post={props.job} />

          <form
            action={async () => {
              const removed = await toggleSaveJob(props.job.id);

              toast({
                title: removed ? "Job Unsaved" : "Job Saved",
                description: "You can view your saved jobs in your dashboard.",
                duration: 1500,
              });
            }}
          >
            <Button variant={props.isFollowing ? "destructive" : "default"}>
              <SaveIcon className={"h-4 w-4 mr-2"} />
              {props.isFollowing ? "Unsave" : "Save"}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

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
const formattedNumber = formatToKForm(50000); // Outputs: '50k'
console.log(formattedNumber);

function getSymbolFromCurrency(currencyCode: string) {
  return currencyCode
    .replace("USD", "$")
    .replace("EUR", "€")
    .replace("GBP", "£");
}
