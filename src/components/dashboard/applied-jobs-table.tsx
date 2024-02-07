"use client";

import { applicationStatuses } from "@/components/dashboard/applications/applications-table-toolbar";
import { AppliedJobDataTableRowActions } from "@/components/dashboard/applied-job-data-table-row-actions";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { JobApplicationWithCompany } from "@/lib/data/job.types";
import { jobUrl, jobsUrl } from "@/lib/pages";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type JobApplicationTableProps = {
  data: JobApplicationWithCompany[];
};

export default function AppliedJobsTable(props: JobApplicationTableProps) {
  return (
    <DataTable columns={columns} data={props.data} noResults={<NoResults />} />
  );
}

const NoResults = () => {
  return (
    <>
      No applications yet,{" "}
      <Link
        href={jobsUrl}
        className={"underline cursor-pointer font-semibold text-primary"}
      >
        start discovering!
      </Link>{" "}
      🚀
    </>
  );
};

export const columns: ColumnDef<JobApplicationWithCompany>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px] inline-flex mt-2"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px] inline-flex mt-2"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "job.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={jobUrl(row.original.jobId)}>{row.original.job.title}</Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.job.title,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => {
      return (
        <div className={"flex flex-row"}>
          <Avatar className={"w-4 h-4 my-auto mr-2"}>
            <AvatarImage
              src={
                row.original.job.company.logoUrl ??
                "https://google.com/favicon.ico"
              }
              alt={row.original.job.company.name}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {row.original.job.company.name}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "appliedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applied At" />
    ),
    cell: ({ row }) => {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                {format(row.original.createdAt, "MMM dd, yyyy HH:mm")}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <div>
                {formatDistanceToNow(row.original.createdAt, {
                  addSuffix: true,
                })}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA, rowB, id) => {
      return (
        rowA.original.createdAt.getTime() - rowB.original.createdAt.getTime()
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = applicationStatuses.find(
        (status) => status.value === row.original.status,
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <AppliedJobDataTableRowActions row={row} />,
  },
];
