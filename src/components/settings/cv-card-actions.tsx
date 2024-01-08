"use client";

import { deleteCv } from "@/app/settings/_actions";
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
import Link from "next/link";
import { useState } from "react";

export default function CvCardActions({ cv }: { cv: UploadedCv }) {
  const [open, setOpen] = useState(false);

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
          <Link href={cv.file} target={"_blank"}>
            <DropdownMenuItem>View</DropdownMenuItem>
          </Link>
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
            <Link href={cv.file} target={"_blank"}>
              <Button variant={"secondary"}>View</Button>
            </Link>
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
