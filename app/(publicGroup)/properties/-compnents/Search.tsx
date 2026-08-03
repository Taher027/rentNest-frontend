"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useTransition } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  return (
    <div className="space-y-5">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

        <input
          defaultValue={searchParams.get("searchTerm") ?? ""}
          onChange={(e) => updateFilter("searchTerm", e.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg border py-2 pl-10 pr-4"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <input
          placeholder="City"
          defaultValue={searchParams.get("city") ?? ""}
          onChange={(e) => updateFilter("city", e.target.value)}
          className="rounded-lg border p-2"
        />

        <select
          defaultValue={searchParams.get("bedRooms") ?? ""}
          onChange={(e) => updateFilter("bedRooms", e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="">Bedrooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          defaultValue={searchParams.get("minPrice") ?? ""}
          onChange={(e) => updateFilter("minPrice", e.target.value)}
          className="rounded-lg border p-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          defaultValue={searchParams.get("maxPrice") ?? ""}
          onChange={(e) => updateFilter("maxPrice", e.target.value)}
          className="rounded-lg border p-2"
        />

        <select
          defaultValue={searchParams.get("status") ?? ""}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="rounded-lg border p-2"
        >
          <option value="">Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="RENTED">Rented</option>
        </select>
      </div>

      {isPending && <p className="text-sm text-gray-500">Loading...</p>}
    </div>
  );
};

export default SearchBar;
