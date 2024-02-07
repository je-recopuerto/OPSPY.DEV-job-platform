"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";

export default function JobPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const lastPage = Math.min(Math.max(currentPage + 2, 5), totalPages);
  const firstPage = Math.max(1, currentPage - 4);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    if (page < 1 || page > totalPages) {
      return;
    }

    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination className={"mt-4"}>
      <PaginationContent>
        {/* Previous Page */}
        {currentPage < 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {range(firstPage, lastPage).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Page */}

        {lastPage < totalPages && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        )}
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
