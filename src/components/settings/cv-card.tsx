import CvCardActions from "@/components/settings/cv-card-actions";
import { Card, CardContent } from "@/components/ui/card";
import { UploadedCv } from "@prisma/client";
import { FileText } from "lucide-react";

export default function CvCard({ cv }: { cv: UploadedCv }) {
  return (
    <Card className={"cursor-default"}>
      <CardContent className={"flex flex-row pt-6 gap-4"}>
        <div className={"my-auto"}>
          <FileText />
        </div>
        <div className={"my-auto"}>
          <p className={"text-sm"}>{shortenString(cv.friendlyName, 50)}</p>
        </div>
        <div className={"ml-auto"}>
          <CvCardActions cv={cv} />
        </div>
      </CardContent>
    </Card>
  );
}

const shortenString = (str: string, maxLen: number) => {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen / 2) + "..." + str.slice(str.length - maxLen / 2);
};
