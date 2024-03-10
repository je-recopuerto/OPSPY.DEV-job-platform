"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { companyUrl } from "@/lib/pages";
import { cn } from "@/lib/utils";
import { Company } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { CircleEllipsisIcon, EyeIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

interface DataTableRowActionsProps {
  row: Row<Company>;
}

export function CompanyDataTableRowActions({ row }: DataTableRowActionsProps) {
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

        <DropdownMenuContent align="end">
          <Link
            href={companyUrl(row.original.id)}
            className={cn("w-full", buttonVariants({ variant: "ghost" }))}
          >
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Link>

          <Link
            href={companyUrl(row.original.id)}
            className={cn("w-full", buttonVariants({ variant: "ghost" }))}
          >
            <EyeIcon className="h-4 w-4 mr-2" />
            View
          </Link>

          {/*<Status row={row} status={row.original.status} />*/}

          {/*<Delete open={open} setOpen={setOpen} />*/}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
