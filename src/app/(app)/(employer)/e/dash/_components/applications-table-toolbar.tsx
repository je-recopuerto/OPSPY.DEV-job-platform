import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter";
import { DataTableToolbarProps } from "@/components/table/data-table-toolbar";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApplicationStatus } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon, Cross, Handshake } from "lucide-react";

export const applicationStatuses: {
  label: string;
  value: ApplicationStatus;
  icon: any;
}[] = [
  {
    label: "Applied",
    value: "APPLIED",
    icon: ArrowDownIcon,
  },
  {
    label: "Matched",
    value: "MATCHED",
    icon: Handshake,
  },
  {
    label: "Rejected",
    value: "REJECTED",
    icon: ArrowUpIcon,
  },
  {
    label: "Offered",
    value: "OFFERED",
    icon: ArrowUpIcon,
  },
  {
    label: "Accepted",
    value: "ACCEPTED",
    icon: ArrowUpIcon,
  },
];

export function ApplicationsTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter name..."
          value={
            (table.getColumn("applicantName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("applicantName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("applicationStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("applicationStatus")}
            title="Status"
            options={applicationStatuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
