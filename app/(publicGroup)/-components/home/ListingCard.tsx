import Image from "next/image";
import { MapPin, Home, Star } from "lucide-react";
import { TListingProperties } from "@/lib/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1) * 100;
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star className="absolute h-3.5 w-3.5 text-amber-300" />
            <span
              className="absolute overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function PropertyCard({ listing }: { listing: TListingProperties }) {
  const showFeatured = listing.badge === "FEATURED";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />

        {showFeatured && (
          <div className="absolute -left-11 top-5 w-36 -rotate-45 bg-violet-500 py-1 text-center text-xs font-medium tracking-wide text-white shadow-sm">
            featured
          </div>
        )}

        <div className="absolute bottom-3 left-3 flex items-baseline gap-0.5 rounded-md bg-black/60 px-2.5 py-1 text-white">
          <span className="text-sm">$</span>
          <span className="text-base font-semibold">{listing.price}</span>
          <span className="text-xs font-normal text-white/80">/night</span>
        </div>
      </div>

      <div className="p-4">
        <StarRating rating={listing.rating} />

        <h3 className="mt-2 text-lg font-medium text-slate-800">
          {listing.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{listing.location}</span>
        </div>

        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-slate-500">
            <Home className="h-4 w-4 shrink-0" />
            <span>{listing.category.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
