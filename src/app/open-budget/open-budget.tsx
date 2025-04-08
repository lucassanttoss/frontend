"use server";


import Link from "next/link";
import { Suspense } from "react";
import { getOpenBudgets } from "./actions";
import BudgetTable from "@/components/budget-table/table";
import Pagination from "@/components/budget-table/pagination";

interface PageProps {
  searchParams: {
    search?: string;
    page?: string;
    projectId?: string;
  };
}

export async function OpenBudget({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const projectId = params.projectId || "";
  const page = Number.parseInt(params.page || "1", 10);
  const limit = 8;

  const { results, total } = await getOpenBudgets(
    projectId,
    search,
    page,
    limit
  );

  if (!results || results.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-ui-table-text">
          No results were found,
          <Link href="/" className="underline">
            {" "}
            return to list
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <BudgetTable budgets={results} />
      <Suspense>
        <Pagination
          total={total}
          currentPage={page}
          limit={limit}
          search={search}
        />
      </Suspense>
    </>
  );
}
