import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ApplicationWithJob } from "@/lib/data/application.types";
import { applicationUrl } from "@/lib/pages";
import { CircleEllipsisIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

interface DataTableRowActionsProps {
  row: Row<ApplicationWithJob>;
}

export function ApplicationsTableRowActions({ row }: DataTableRowActionsProps) {
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
        <DropdownMenuItem asChild>
          <Link href={applicationUrl(row.original.id)}>
            <EyeIcon className="h-4 w-4 mr-2" />
            View
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
