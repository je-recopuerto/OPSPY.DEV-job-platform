"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobPostWithCompany } from "@/services/jobPostService";
import { SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSaveJob } from "@/app/actions";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

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
          <CardTitle className={"text-md"}>{props.job.title}</CardTitle>
          <CardDescription>{props.job.company.name}</CardDescription>
        </div>

        <div>
          <div className={"flex flex-row gap-2"}>
            <Badge>.NET</Badge>
            <Badge>Postgres</Badge>
            <Badge>Terraform</Badge>
            <Badge>GCP</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className={"flex flex-row gap-8 pb-6"}>
          <CardDescription>
            <small className="text-sm font-bold leading-none">Location</small>
            <p className="text-sm font-normal leading-none">
              {props.job.location}
            </p>
          </CardDescription>

          <CardDescription>
            <small className="text-sm font-bold leading-none">Salary</small>
            <p className="text-sm font-normal leading-none">
              {getSalaryRangeString(
                props.job.minSalary,
                props.job.maxSalary,
                props.job.currency,
              )}
            </p>
          </CardDescription>
        </div>

        <CardDescription>
          <small className="text-sm font-bold leading-none">Description</small>
          <p className="text-sm font-normal leading-none">
            {props.job.description}
          </p>
        </CardDescription>

        <form
          className={"mt-4"}
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
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getSymbolFromCurrency(currencyCode: string) {
  return currencyCode
    .replace("USD", "$")
    .replace("EUR", "€")
    .replace("GBP", "£");
}
