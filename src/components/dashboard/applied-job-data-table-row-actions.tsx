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
import { unsaveJob, withdrawApplication } from "@/app/actions";
import { JobApplication } from ".prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface DataTableRowActionsProps {
  row: Row<JobApplication>;
}

export function AppliedJobDataTableRowActions({
  row,
}: DataTableRowActionsProps) {
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
      <Dialog>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/*<DropdownMenuItem>Edit</DropdownMenuItem>*/}
          {/*<DropdownMenuItem>Make a copy</DropdownMenuItem>*/}
          {/*<DropdownMenuSub>*/}
          {/*  <DropdownMenuSubTrigger>Set Status</DropdownMenuSubTrigger>*/}
          {/*  <DropdownMenuSubContent>*/}
          {/*  </DropdownMenuSubContent>*/}
          {/*</DropdownMenuSub>*/}
          {/*<DropdownMenuSeparator />*/}
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Withdraw
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to withdraw?</DialogTitle>
            <DialogDescription>
              If you have applied through quick apply,{" "}
              <b>you will not be able to apply again</b>, and{" "}
              <b>your application will no longer be visible to the company.</b>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              variant={"destructive"}
              onClick={async () => await withdrawApplication(row.original.id)}
            >
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
