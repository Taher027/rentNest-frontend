import { getProperties } from "@/app/(publicGroup)/_Actions/getProperty";
import { TListingProperties } from "@/lib/types";
import React from "react";
import { PropertyCard } from "../-components/home/ListingCard";

const PropertyPage = async () => {
  const properties = await getProperties();
  return (
    <div className="max-w-7xl mx-auto p ">
      <section className=" px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-slate-800">
            Featured Listings to Rent
          </h2>
          <p className="mt-1.5 text-slate-500">
            The most trendy accommodations available
          </p>

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
