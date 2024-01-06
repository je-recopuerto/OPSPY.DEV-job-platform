"use client";

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
import Link from "next/link";

type JobListingProps = {
  job: JobPostWithCompany;
  isFollowing: boolean;
};

export default function JobListing(props: JobListingProps) {
  return (
    <Card>
      <CardHeader className={"flex flex-row gap-x-4 space-y-0"}>
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
            {props.job.company.name} | {props.job.location} | {props.job.type} |{" "}
            {getSalaryRangeString(
              props.job.minSalary,
              props.job.maxSalary,
              props.job.currency,
            )}
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
        <p className={"text-sm font-normal leading-none text-muted-foreground"}>
          {props.job.description?.slice(0, 125) + "..."}
        </p>
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
// const formattedNumber = formatToKForm(50000); // Outputs: '50k'
// console.log(formattedNumber);

function getSymbolFromCurrency(currencyCode: string) {
  return currencyCode
    .replace("USD", "$")
    .replace("EUR", "€")
    .replace("GBP", "£");
}
