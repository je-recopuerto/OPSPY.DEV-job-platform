"use client";

import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import Link from "next/link";
import { ApplicationWithJob } from "@/services/ApplicationService";
import { ApplicationsTableRowActions } from "@/components/dashboard/applications/applications-table-row-actions";
import { applicationStatuses } from "@/components/dashboard/saved-job-table";
import React from "react";
import { ApplicationsTableToolbar } from "@/components/dashboard/applications/applications-table-toolbar";

type JobTrackerTableProps = {
  data: ApplicationWithJob[];
};

export default function ApplicationsTable(props: JobTrackerTableProps) {
  return (
    <DataTable
      columns={columns}
      data={props.data}
      toolbar={(table) => {
        return <ApplicationsTableToolbar table={table} />;
      }}
    />
  );
}

const columns: ColumnDef<ApplicationWithJob>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "applicantName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/e/applications/${row.original.id}`}>
          {row.original.user.name}
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.user.name,
  },
  {
    accessorKey: "applicationJob",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Post" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/jobs/${row.original.jobId}`}>
          {row.original.job.title}
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "applicationStatus",
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
    accessorFn: (row) => row.status.toString(),
    filterFn: (row, id, value) => {
      console.log("Filtering by status", row, id, value);
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <ApplicationsTableRowActions row={row} />,
  },
];
