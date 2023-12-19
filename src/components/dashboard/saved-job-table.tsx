"use client";

import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import {
  CheckIcon,
  CircleIcon,
  CrossIcon,
  LucideIcon,
  ShieldQuestionIcon,
  TimerIcon,
} from "lucide-react";
import { JobTrackerWithPost } from "@/services/JobService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApplicationStatus } from "@prisma/client";
import { SavedJobDataTableRowActions } from "./saved-job-data-table-row-actions";

type JobTrackerTableProps = {
  data: JobTrackerWithPost[];
};

export default function SavedJobTable(props: JobTrackerTableProps) {
  return <DataTable columns={columns} data={props.data} />;
}

export const statuses: {
  value: ApplicationStatus;
  label: string;
  icon?: LucideIcon;
}[] = [
  {
    value: "APPLIED",
    label: "Applied",
    icon: CircleIcon,
  },
  {
    value: "INTERVIEWING",
    label: "Interviewing",
    icon: TimerIcon,
  },
  {
    value: "REJECTED",
    label: "Rejected",
    icon: CrossIcon,
  },
  {
    value: "OFFERED",
    label: "Offered",
    icon: CrossIcon,
  },
  {
    value: "ACCEPTED",
    label: "Accepted",
    icon: CheckIcon,
  },
];

export const columns: ColumnDef<JobTrackerWithPost>[] = [
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
      return <div className="">{row.original.job.title}</div>;
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
    id: "actions",
    cell: ({ row }) => <SavedJobDataTableRowActions row={row} />,
  },
];
