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
import { MapPin, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSaveJob } from "@/app/actions";
import { toast } from "@/components/ui/use-toast";

type JobListingProps = {
  job: JobPostWithCompany;
  isFollowing: boolean;
};

export default function JobListing(props: JobListingProps) {
  return (
    <Card className={"w-full"}>
      <CardHeader className={"flex flex-row gap-x-3 space-y-0"}>
        <Avatar className={"h-14 w-14"}>
          <AvatarImage
            src={props.job.company.logoUrl ?? "https://github.com/shadcn.png"}
            alt={props.job.company.name}
            sizes={"cover"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className={"flex flex-row w-full justify-between"}>
          <div>
            <CardTitle>{props.job.title}</CardTitle>
            <CardDescription>{props.job.company.name}</CardDescription>
            <CardDescription className={"flex flex-row"}>
              <MapPin size={15} className={"mr-1 my-auto"} />
              {props.job.location}
            </CardDescription>
          </div>
          <div className={"flex justify-end"}>
            <CardDescription>
              {getSalaryRangeString(
                props.job.minSalary,
                props.job.maxSalary,
                props.job.currency,
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
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
          <Button>
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
