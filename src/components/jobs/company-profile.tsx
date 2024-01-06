import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Company } from "@prisma/client";
import React from "react";
import Image from "next/image";

type CompanyProfileProps = {
  company: Company;
};

export default function CompanyProfile(props: CompanyProfileProps) {
  return (
    <Card className={"w-full"}>
      <CardHeader className={"flex flex-row gap-x-3 space-y-0 p-2"}>
        <Image
          className={"h-full rounded-sm"}
          width={72}
          height={72}
          src={props.company.logoUrl ?? "https://github.com/shadcn.png"}
          alt={props.company.name}
          sizes={"cover"}
        />

        <div className={"flex flex-row w-full justify-between p-2"}>
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
