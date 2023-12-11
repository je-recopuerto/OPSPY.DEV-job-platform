"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleEllipsisIcon } from "lucide-react";
import { setJobTrackerStatus, unsaveJob } from "@/app/actions";
import { JobTrackerWithPost } from "@/services/jobTrackerService";
import { JobStatus } from ".prisma/client";

interface DataTableRowActionsProps {
  row: Row<JobTrackerWithPost>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
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
      <DropdownMenuContent align="end" className="w-[160px]">
        {/*<DropdownMenuItem>Edit</DropdownMenuItem>*/}
        {/*<DropdownMenuItem>Make a copy</DropdownMenuItem>*/}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={row.original.status}>
              {Object.keys(JobStatus).map((label) => (
                <DropdownMenuRadioItem
                  key={label}
                  value={label}
                  onClick={async () =>
                    await setJobTrackerStatus(
                      label as JobStatus,
                      row.original.id,
                    )
                  }
                >
                  {formatJobStatus(label as JobStatus)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => await unsaveJob(row.original.id)}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const formatJobStatus = (status: JobStatus) => {
  // Uppercase first character, lowercase rest
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};
