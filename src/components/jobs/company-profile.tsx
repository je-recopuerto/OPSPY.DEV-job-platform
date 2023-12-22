import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Company } from "@prisma/client";
import React from "react";

type CompanyProfileProps = {
  company: Company;
};

export default function CompanyProfile(props: CompanyProfileProps) {
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
        </div>
      </CardHeader>
    </Card>
  );
}
