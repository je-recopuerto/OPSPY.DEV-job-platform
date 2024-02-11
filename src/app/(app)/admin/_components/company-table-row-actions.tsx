"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Company } from "@prisma/client";
import { Row } from "@tanstack/react-table";
import { CircleEllipsisIcon } from "lucide-react";
import { useState } from "react";

interface DataTableRowActionsProps {
  row: Row<Company>;
}

export function CompanyDataTableRowActions({ row }: DataTableRowActionsProps) {
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
          {"Lorem ipsum"}
          {/*<Status row={row} status={row.original.status} />*/}

          {/*<Delete open={open} setOpen={setOpen} />*/}
        </DropdownMenuContent>
      </DropdownMenu>

      {/*<DeleteDialog open={open} setOpen={setOpen} row={row} />*/}
    </>
  );
}
