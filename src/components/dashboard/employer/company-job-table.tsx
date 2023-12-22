"use client";

import { DataTable } from "@/components/table/data-table";
import { CompanyWithOpenings } from "@/services/companyService";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { AppliedJobDataTableRowActions } from "@/components/dashboard/applied-job-data-table-row-actions";
import { JobPost } from "@prisma/client";
import Link from "next/link";
import { CompanyJobDataTableRowActions } from "@/components/dashboard/employer/company-job-table-row-actions";

type AppliedJobsTableProps = {
  data: CompanyWithOpenings;
};

export default function CompanyJobTable(props: AppliedJobsTableProps) {
  return <DataTable columns={columns} data={props.data.openings} />;
}

export const columns: ColumnDef<JobPost>[] = [
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
    accessorKey: "job.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return (
        <Link href={`/jobs/${row.original.id}`}>{row.original.title}</Link>
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
