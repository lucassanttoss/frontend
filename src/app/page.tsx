import { Suspense } from "react";
import { Sidebar } from "@/components/sidebar";
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-400">
      <Suspense>
        <Nav />
      </Suspense>
      <main className="flex flex-row content-none flex-1">
        <Suspense>
          <Sidebar />
        </Suspense>
        <div className="m-6 bg-white rounded-md w-full p-6 ml-57 flex flex-col pt-12">
          <h1 className="text-ui-primary font-bold text-3xl">Welcome</h1>
        </div>
      </main>
    </div>
  );
}
