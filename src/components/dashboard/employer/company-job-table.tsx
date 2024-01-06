"use client";

import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import Link from "next/link";
import { CompanyJobDataTableRowActions } from "@/components/dashboard/employer/company-job-table-row-actions";
import { Card, CardContent } from "@/components/ui/card";
import {
  CompanyWithOpeningsAndApplications,
  JobPostWithApplications,
} from "@/services/JobService";
import { ApplicationStatus } from "@prisma/client";
import { JobApplication } from ".prisma/client";

type AppliedJobsTableProps = {
  data: CompanyWithOpeningsAndApplications;
};

export default function CompanyJobTable(props: AppliedJobsTableProps) {
  return <DataTable columns={columns} data={props.data.openings} />;
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
    accessorKey: "candidates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Candidates" />
    ),
    cell: ({ row }) => {
      return (
        <div className={"flex flex-row gap-2"}>
          <Card>
            <CardContent className={"flex flex-col text-center p-3"}>
              <h1 className={"text-green-600 dark:text-green-500"}>Active</h1>
              <div>
                {countOfStatuses(
                  [ApplicationStatus.APPLIED, ApplicationStatus.INTERVIEWING],
                  row.original.application,
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={"flex flex-col text-center p-3"}>
              <h1 className={"text-destructive"}>Declined</h1>
              <div>
                {countOfStatuses(
                  [ApplicationStatus.REJECTED],
                  row.original.application,
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={"flex flex-col text-center p-3"}>
              <h1 className={""}>Review Now</h1>
              <div>
                {countOfStatuses(
                  [ApplicationStatus.APPLIED],
                  row.original.application,
                )}
              </div>
            </CardContent>
          </Card>
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
      return <>Active</>;
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
