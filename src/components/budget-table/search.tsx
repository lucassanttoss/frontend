"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import { SearchIcon } from "@/components/budget-table/icons";

export function SearchBar({ initialSearch }: { initialSearch?: string }) {
  const [value, setValue] = useState(initialSearch || "");
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearch = useCallback(
    (val: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        params.set("search", val);
        params.set("page", "1");
        router.push(`?${params.toString()}`);
      }, 400);
    },
    [router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    debouncedSearch(val);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div className="flex gap-1 mb-4 justify-end">
      <div className="rounded-sm border border-ui-table flex items-center w-82 h-12 gap-3 pl-3">
        <SearchIcon stroke="#3E5377" />
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleChange}
          className="rounded w-full h-full bg-none border-none text-gray-900"
        />
      </div>
      <button
        type="button"
        className="bg-blue-600 text-white rounded-sm hover:bg-blue-700 w-11 h-12 cursor-pointer flex justify-center items-center"
        onClick={() => debouncedSearch(value)}
      >
        <SearchIcon stroke="white" />
      </button>
    </div>
  );
}
