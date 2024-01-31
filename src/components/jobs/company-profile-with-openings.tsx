import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyWithOpenings } from "@/services/JobService";

type CompanyProfileProps = {
  company: CompanyWithOpenings;
};

function CompanyProfileWithOpenings(props: CompanyProfileProps) {
  return (
    <Card className={"w-full"}>
      <CardHeader className={"flex flex-row gap-x-3 space-y-0"}>
        <Avatar className={"h-14 w-14"}>
          <AvatarImage
            src={props.company.logoUrl ?? "https://github.com/shadcn.png"}
            alt={props.company.name}
            sizes={"cover"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className={"flex flex-row w-full justify-between"}>
          <div>
            <CardTitle>{props.company.name}</CardTitle>
            <CardDescription>
              {props.company.description?.slice(0, 100)}
            </CardDescription>
          </div>
          <div className={"flex justify-end"}>
            {props.company.openings.length} Jobs
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

function CompanyProfileSkeleton() {
  return (
    <Card className={"w-full"}>
      <CardHeader className={"flex flex-row gap-x-3"}>
        <div>
          <Skeleton className={"h-14 w-14 rounded-full"} />
        </div>
        <div className={"flex flex-row w-full justify-between"}>
          <div className={"flex flex-col gap-y-2"}>
            <Skeleton className="w-24 h-4 rounded" />
            <Skeleton className="w-48 h-4 rounded" />
          </div>
          <div className={"flex justify-end"}>
            <Skeleton className="w-12 h-4 rounded" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export { CompanyProfileSkeleton, CompanyProfileWithOpenings };
