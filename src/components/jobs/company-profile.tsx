import StatusBadge from "@/components/companies/status-badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Company } from "@prisma/client";
import Image from "next/image";

type CompanyProfileProps = {
  company: Company;
  showStatus?: boolean;
};

export default function CompanyProfile({
  company,
  showStatus,
}: CompanyProfileProps) {
  return (
    <Card className={"w-full"}>
      <CardHeader className={"flex flex-row gap-x-3 space-y-0 p-2"}>
        <Image
          className={"h-full rounded-sm"}
          width={72}
          height={72}
          src={company.logoUrl ?? "https://github.com/shadcn.png"}
          alt={company.name}
          sizes={"cover"}
        />

        <div className={"flex flex-row w-full justify-between p-2"}>
          <div>
            <CardTitle>
              {company.name}

              {showStatus && (
                <StatusBadge
                  className={"ml-2"}
                  isVerified={company.isVerified}
                />
              )}
            </CardTitle>
            <CardDescription>
              {company.description?.slice(0, 300)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
