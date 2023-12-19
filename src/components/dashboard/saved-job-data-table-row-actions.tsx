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
import { JobTrackerWithPost } from "@/services/JobService";

interface DataTableRowActionsProps {
  row: Row<JobTrackerWithPost>;
}

export function SavedJobDataTableRowActions({ row }: DataTableRowActionsProps) {
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
        {/*<DropdownMenuSub>*/}
        {/*  <DropdownMenuSubTrigger>Set Status</DropdownMenuSubTrigger>*/}
        {/*  <DropdownMenuSubContent>*/}
        {/*  </DropdownMenuSubContent>*/}
        {/*</DropdownMenuSub>*/}
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
