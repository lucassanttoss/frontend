import { Suspense } from "react";
import { BudgetTransfer } from "./budget-transfer";
import { Skeleton } from "@/components/budget-table/skeleton";
import { Sidebar } from "@/components/sidebar";
import { Nav } from "@/components/nav";
import { SearchBar } from "@/components/budget-table/search";

export type paramsType = Promise<{
  projectId?: string;
  page?: string;
  search?: string;
}>;

export default async function Page(props: { searchParams: paramsType }) {
  const searchParams = await props?.searchParams;
  const { search, page, projectId } = searchParams || {};

  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <Suspense>
        <Nav />
      </Suspense>
      <main className="flex flex-row content-none flex-1">
        <Suspense>
          <Sidebar />
        </Suspense>
        <div className="m-6 bg-white rounded-md w-full p-8 ml-57 flex flex-col pt-14 gap-4">
          <h1 className="text-ui-primary font-bold text-3xl">
            Budget Transfer
          </h1>
          <SearchBar initialSearch={search} />
          <Suspense
            key={`${projectId}-${page}-${search}`}
            fallback={<Skeleton />}
          >
            <BudgetTransfer searchParams={searchParams || {}} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
