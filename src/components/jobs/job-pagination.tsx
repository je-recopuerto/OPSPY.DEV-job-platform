"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function JobPagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) ?? 1;

  const lastPage = Math.min(Math.max(currentPage + 2, 5), totalPages);
  const firstPage = Math.max(1, currentPage - 4);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    if (page === 1 || page === totalPages) {
      return;
    }

    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);

    console.log("Setting page to", page);
  };

  return (
    <Pagination className={"mt-4"}>
      <PaginationContent>
        {/* Previous Page */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            // disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {range(firstPage, lastPage).map((page) => (
          <PaginationItem
            key={page}
            className={cn(
              "cursor-pointer",
              currentPage == page ? "bg-accent rounded-md font-extrabold" : "",
            )}
          >
            <PaginationLink onClick={() => handlePageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Page */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

const range: (start: number, end: number) => number[] = (start, end) => {
  if (start >= end) {
    return [];
  }

  return [...Array(end - start + 1).keys()].map(
    (key: number): number => key + start,
  );
};
