"use client";

import { Input } from "@/components/ui/input";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "@/components/ui/label";

export default function JobFilter({ placeholder }: { placeholder: string }) {
  const search = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (filter: z.infer<typeof filterJobPostsSchema>) => {
      const parma = new URLSearchParams(search);
      if (filter.keywords) {
        parma.set("keywords", filter.keywords);
      } else {
        parma.delete("keywords");
      }

      if (filter.minSalary) {
        parma.set("minSalary", filter.minSalary.toString());
      } else {
        parma.delete("minSalary");
      }

      replace(`${pathname}?${parma.toString()}`);
    },
    300,
  );

  return (
    <>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          className={"max-w-md"}
          placeholder={placeholder}
          defaultValue={search.get("keywords")?.toString()}
          onChange={(e) => {
            e.preventDefault();
            handleSearch({
              keywords: e.target.value,
              ...query,
            });
          }}
        />

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="minSalary">Minimum Salary ({query.minSalary})</Label>
          <Input
            type="number"
            id="minSalary"
            placeholder="10000"
            defaultValue={Number(params.get("minSalary"))}
            onChange={(e) => {
              e.preventDefault();
              handleSearch({
                minSalary: Number.parseFloat(e.target.value),
                ...query,
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
