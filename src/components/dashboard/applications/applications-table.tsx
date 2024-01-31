"use client";

import { ApplicationsTableRowActions } from "@/components/dashboard/applications/applications-table-row-actions";
import { ApplicationsTableToolbar } from "@/components/dashboard/applications/applications-table-toolbar";
import { applicationStatuses } from "@/components/dashboard/saved-job-table";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { applicationUrl, jobUrl } from "@/lib/pages";
import { ApplicationWithJob } from "@/services/ApplicationService";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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
    accessorKey: "applicantName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={applicationUrl(row.original.id)}>
          {row.original.user.firstName + " " + row.original.user.lastName}
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.user.firstName + " " + row.user.lastName,
  },
  {
    accessorKey: "applicationJob",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Post" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={jobUrl(row.original.job.id)}>{row.original.job.title}</Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "applicationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Applied" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-sm">
          {new Date(row.original.createdAt).toLocaleString()}
        </div>
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
