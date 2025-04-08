"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowIcon } from "@/components/budget-table/icons";

interface IPaginationProps {
  total: number;
  currentPage: number;
  limit: number;
  search?: string;
}

export default function Pagination({
  total,
  currentPage,
  limit,
  search,
}: IPaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const router = useRouter();
  const params = useSearchParams();
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("page", page.toString());
    if (search) newParams.set("search", search);
    router.push(`?${newParams.toString()}`);
  };

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-[#3E5377]">
      <span>
        {start} – {end} de {total}
      </span>

      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={isFirstPage}
        className={`flex h-8 w-8 items-center justify-center rounded-md border transition-colors
          ${
            isFirstPage
              ? "bg-ui-table cursor-not-allowed"
              : "bg-ui-primary hover:bg-ui-hover cursor-pointer"
          }`}
      >
        <ArrowIcon
          direction="left"
          stroke={isFirstPage ? "#C5D0E0" : "white"}
        />
      </button>

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={isLastPage}
        className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors
          ${
            isLastPage
              ? "bg-ui-table cursor-not-allowed"
              : "bg-ui-primary hover:bg-ui-hover cursor-pointer"
          }`}
      >
        <ArrowIcon
          direction="right"
          stroke={isLastPage ? "#C5D0E0" : "white"}
        />
      </button>
    </div>
  );
}
