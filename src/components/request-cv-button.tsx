"use client";

import { requestCvUrl } from "@/app/(app)/settings/_actions";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

type ViewCvButtonProps = {
  cvId?: number;
};

export default function ViewCvButton({ cvId }: ViewCvButtonProps) {
  return (
    <Button
      variant={"default"}
      onClick={async () => {
        if (cvId) {
          const url = await requestCvUrl(cvId);
          window.open(url);
        }
      }}
      disabled={!cvId}
    >
      <FileSearch className={"mr-2 h-4 w-4"} />
      {cvId ? "View CV" : "No CV"}
    </Button>
  );
}
