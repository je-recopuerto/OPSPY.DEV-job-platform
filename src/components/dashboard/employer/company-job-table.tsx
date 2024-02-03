"use client";

import { JobApplication } from ".prisma/client";
import { CompanyJobDataTableRowActions } from "@/components/dashboard/employer/company-job-table-row-actions";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { jobUrl } from "@/lib/pages";
import { cn } from "@/lib/utils";
import {
  CompanyWithOpeningsAndApplications,
  JobPostWithApplications,
} from "@/services/JobService";
import { ApplicationStatus, JobStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CheckIcon, LucideIcon, XIcon } from "lucide-react";
import Link from "next/link";

type AppliedJobsTableProps = {
  data: CompanyWithOpeningsAndApplications;
};

export default function CompanyJobTable({ data }: AppliedJobsTableProps) {
  return <DataTable columns={columns} data={data.openings} />;
}

export const columns: ColumnDef<JobPostWithApplications>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] inline-flex mt-2"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] inline-flex mt-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "job.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return <Link href={jobUrl(row.original.id)}>{row.original.title}</Link>;
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.title,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted At" />
    ),
    cell: ({ row }) => {
      return <>{format(row.original.createdAt, "MMM dd, yyyy HH:mm")}</>;
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.title,
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expires At" />
    ),
    cell: ({ row }) => {
      return (
        <>
          {row.original.expiresAt
            ? format(row.original.expiresAt, "MMM dd, yyyy HH:mm")
            : "-"}
        </>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.title,
  },
  {
    accessorKey: "candidates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Candidates" />
    ),
    cell: ({ row }) => {
      return (
        <div className={"flex flex-row gap-2"}>
          <p className={"text-sm"}>
            {row.original.application.length} applications
            <span className={"text-muted-foreground"}>
              {" / "}
              {countOfStatuses(
                [ApplicationStatus.APPLIED],
                row.original.application,
              )}{" "}
              pending
            </span>
          </p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.title,
  },
  {
    accessorKey: "job.status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = jobStatuses.find(
        (status) => status.value === row.original.status,
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon
              className={cn("mr-2 h-4 w-4 text-muted-foreground", status.color)}
            />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.title,
  },
  {
    id: "actions",
    cell: ({ row }) => <CompanyJobDataTableRowActions row={row} />,
  },
];

const countOfStatuses = (
  statuses: ApplicationStatus[],
  applications: JobApplication[],
) => {
  return applications.filter((x) => statuses.includes(x.status)).length;
};

export const jobStatuses: {
  value: JobStatus;
  label: string;
  icon?: LucideIcon;
  color?: string;
}[] = [
  {
    value: "ACTIVE",
    label: "Active",
    icon: CheckIcon,
    color: "text-green-600",
  },
  {
    value: "INACTIVE",
    label: "Inactive",
    icon: XIcon,
    color: "text-destructive",
  },
];
