"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { jobStatuses } from "@/components/dashboard/employer/company-job-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobPostWithApplications } from "@/lib/data/job.types";
import { cn } from "@/lib/utils";
import { deleteJobPost, updateJobStatus } from "@/services/actions/job";
import { JobStatus } from "@prisma/client";
import { CircleEllipsisIcon, Eye, TrashIcon } from "lucide-react";
import { useState } from "react";

interface DataTableRowActionsProps {
  row: Row<JobPostWithApplications>;
}

export function CompanyJobDataTableRowActions({
  row,
}: DataTableRowActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
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

        <DropdownMenuContent align="end" className="w-48">
          <Status row={row} status={row.original.status} />

          <Delete open={open} setOpen={setOpen} />
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog open={open} setOpen={setOpen} row={row} />
    </>
  );
}

const Status = ({
  row,
  status,
}: {
  row: Row<JobPostWithApplications>;
  status: JobStatus;
}) => {
  const [loading, setLoading] = useState(false);

  const setStatus = async (status: JobStatus) => {
    setLoading(true);
    await updateJobStatus(row.original.id, status);
    setLoading(false);
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Eye className={"w-4 h-4 mr-2"} />
        Status
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {Object.entries(jobStatuses).map(([key, value]) => (
            <DropdownMenuItem
              key={key}
              disabled={status === value.value}
              onClick={() => setStatus(value.value)}
            >
              {value.icon && (
                <value.icon
                  className={cn(
                    "mr-2 h-4 w-4 text-muted-foreground",
                    value.color,
                  )}
                />
              )}
              {value.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const Delete = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <DropdownMenuItem onClick={() => setOpen(true)}>
      <TrashIcon className={"w-4 h-4 mr-2"} />
      Delete
      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
};

const DeleteDialog = ({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: Row<JobPostWithApplications>;
}) => {
  const [deleting, setDeleting] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
  );
};
