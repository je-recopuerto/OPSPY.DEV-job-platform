import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {JobPostWithCompany} from "@/services/jobPostService";
import {MapPin} from "lucide-react";

type JobListingProps = {
  job: JobPostWithCompany
}

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
            {getSymbolFromCurrency(props.job.currency)}{props.job.minSalary}{props.job.maxSalary ? ` - ${props.job.maxSalary}` : ""}
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

function getSymbolFromCurrency(currencyCode: string) {
  return currencyCode
    .replace("USD", "$")
    .replace("EUR", "€")
    .replace("GBP", "£");
}