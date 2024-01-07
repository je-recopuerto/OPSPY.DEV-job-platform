"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JobPostWithApplications } from "@/services/JobService";
import { deleteJobPost } from "@/services/actions/job";
import { CircleEllipsisIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface DataTableRowActionsProps {
  row: Row<JobPostWithApplications>;
}

export function CompanyJobDataTableRowActions({
  row,
}: DataTableRowActionsProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <CircleEllipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <TrashIcon className={"w-4 h-4 mr-2"} />
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this job post?
            </DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={async () => {
                setDeleting(true);
                await deleteJobPost(row.original.id);
                setDeleting(false);
                setOpen(false);
              }}
              disabled={deleting}
            >
              <TrashIcon className={"w-4 h-4 mr-2"} />
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
