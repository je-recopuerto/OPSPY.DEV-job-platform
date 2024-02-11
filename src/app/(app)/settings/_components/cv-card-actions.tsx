"use client";

import { deleteCv, requestCvUrl } from "@/app/(app)/settings/_actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UploadedCv } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function CvCardActions({ cv }: { cv: UploadedCv }) {
  const [open, setOpen] = useState(false);

  const viewCv = async () => {
    const url = await requestCvUrl(cv.id);
    window.open(url, "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={viewCv}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              By deleting this CV, companies will not be able to see it. This
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"secondary"}>View</Button>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={async () => {
                await deleteCv(cv.id);
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
