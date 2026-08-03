import { getProperties } from "@/app/(publicGroup)/_Actions/getProperty";
import { TListingProperties } from "@/lib/types";
import React from "react";
import { PropertyCard } from "../-components/home/ListingCard";
import SearchBar from "./-compnents/Search";

type Props = {
  searchParams: Promise<{
    searchTerm?: string;
    city?: string;
    status?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    bedRooms?: string;
  }>;
};
const PropertyPage = async ({ searchParams }: Props) => {
  const filters = await searchParams;

  const properties = await getProperties(filters);
  return (
    <div className="max-w-7xl mx-auto p ">
      <section className=" px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SearchBar />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties?.data.map((listing: TListingProperties) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyPage;
