import { getProperties } from "@/app/(publicGroup)/_Actions/getProperty";
import { TListingProperties } from "@/lib/types";
import PropertySearch from "./-compnents/Search";
import { PropertyCard } from "../-components/home/ListingCard";

type Props = {
  searchParams: Promise<{
    searchTerm?: string;
    city?: string;
    categoryId?: string;
    status?: string;
    minPrice?: string;
    maxPrice?: string;
    bedRooms?: string;
  }>;
};

const PropertyPage = async ({ searchParams }: Props) => {
  const filters = await searchParams;

  const properties = await getProperties(filters);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <PropertySearch />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties?.data?.length ? (
          properties.data.map((listing: TListingProperties) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))
        ) : (
          <p className="col-span-full py-10 text-center text-slate-500">
            No properties found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;
