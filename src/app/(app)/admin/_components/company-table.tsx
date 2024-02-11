"use client";

import { CompanyDataTableRowActions } from "@/app/(app)/admin/_components/company-table-row-actions";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { companyUrl } from "@/lib/pages";
import { Company } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type CompanyTableProps = {
  data: Company[];
};

export default function CompanyTable({ data }: CompanyTableProps) {
  return <DataTable columns={columns} data={data} />;
}

export const columns: ColumnDef<Company>[] = [
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
    accessorKey: "company.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
    cell: ({ row }) => {
      return (
        <Link
          href={companyUrl(row.original.id)}
          target={"_blank"}
          className={"flex flex-row hover:underline"}
        >
          {row.original.name}
          <ExternalLink className="ml-1 w-3 h-3 my-auto" />
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.name,
  },
  {
    accessorKey: "company.website",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Website URL" />
    ),
    cell: ({ row }) => {
      return row.original.website ? (
        <Link
          href={row.original.website}
          target={"_blank"}
          className={"flex flex-row hover:underline"}
        >
          {row.original.website}
          <ExternalLink className="ml-1 w-3 h-3 my-auto" />
        </Link>
      ) : (
        <>{row.original.website}</>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.name,
  },
  {
    id: "actions",
    cell: ({ row }) => <CompanyDataTableRowActions row={row} />,
  },
];
