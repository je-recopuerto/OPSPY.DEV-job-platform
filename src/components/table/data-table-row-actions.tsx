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

import { CircleEllipsisIcon } from "lucide-react";
import { unsaveJob } from "@/app/actions";
import { JobTrackerWithPost } from "@/services/jobTrackerService";

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
        {/*<DropdownMenuItem>Favorite</DropdownMenuItem>*/}
        {/*<DropdownMenuSeparator />*/}
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
