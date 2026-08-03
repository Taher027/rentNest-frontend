"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const PropertySearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("searchTerm", value);
    } else {
      params.delete("searchTerm");
    }

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  return (
    <div className="mt-6 max-w-md">
      <label htmlFor="property-search" className="sr-only">
        Search Property
      </label>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

        <input
          id="property-search"
          type="text"
          defaultValue={searchParams.get("searchTerm") ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by title or location..."
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-slate-500"
        />
      </div>

      {isPending && <p className="mt-2 text-sm text-gray-500">Searching...</p>}
    </div>
  );
};

export default PropertySearch;
