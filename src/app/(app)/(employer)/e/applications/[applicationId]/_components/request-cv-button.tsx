"use client";

import { requestCvUrl } from "@/app/(app)/settings/_actions/cv";
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
          const response = await requestCvUrl(cvId);
          if (response.success) {
            window.open(response.value);
          }
        }
      }}
      disabled={!cvId}
    >
      <FileSearch className={"mr-2 h-4 w-4"} />
      {cvId ? "View CV" : "No CV"}
    </Button>
  );
}
