import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Home,
  Star,
  BedDouble,
  Ruler,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";
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
          <span key={i} className="relative inline-block h-4 w-4">
            <Star className="absolute h-4 w-4 text-amber-300" />
            <span
              className="absolute overflow-hidden"
              style={{ width: `${fill}%` }}
            >
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function PropertyDetailsCard({
  listing,
}: {
  listing: TListingProperties;
}) {
  const showFeatured = listing.badge === "FEATURED";
  const [mainImage, ...restImages] = listing.images;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Title row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {listing.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>
                {listing.location}, {listing.city}
              </span>
            </div>
            <StarRating rating={listing.rating} />
          </div>
        </div>

        {showFeatured && (
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
            Featured
          </span>
        )}
      </div>

      {/* Image gallery */}
      <div className="mt-6 grid grid-cols-4 gap-2">
        <div className="relative col-span-4 h-80 overflow-hidden rounded-xl sm:col-span-3 sm:row-span-2">
          <Image
            src={mainImage}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        </div>
        {restImages.slice(0, 2).map((src, i) => (
          <div
            key={i}
            className="relative col-span-2 hidden h-[9.5rem] overflow-hidden rounded-xl sm:col-span-1 sm:block"
          >
            <Image
              src={src}
              alt={`${listing.title} photo ${i + 2}`}
              fill
              sizes="20vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Quick facts */}
          <div className="flex flex-wrap gap-6 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Home className="h-4 w-4 text-slate-400" />
              <span>{listing.category?.title ?? "Property"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BedDouble className="h-4 w-4 text-slate-400" />
              <span>{listing.bedRooms} bed rooms</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Ruler className="h-4 w-4 text-slate-400" />
              <span>{listing.areaSize} sqft</span>
            </div>
          </div>

          {/* Description */}
          <div className="py-6">
            <h2 className="text-base font-semibold text-slate-900">
              About this place
            </h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {listing.description}
            </p>
          </div>

          {/* Landlord */}
          <div className="border-t border-slate-100 py-6">
            <h2 className="text-base font-semibold text-slate-900">
              Hosted by
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-100">
                {listing.landlord?.avatar && (
                  <Image
                    src={listing.landlord.avatar}
                    alt={listing.landlord.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-sm font-medium text-slate-800">
                  {listing.landlord?.name}
                  {listing.landlord?.isVerified && (
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  )}
                </div>
                <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-slate-500">
                  {listing.landlord?.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      {listing.landlord.email}
                    </span>
                  )}
                  {listing.landlord?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {listing.landlord.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 rounded-xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-slate-500">$</span>
              <span className="text-2xl font-semibold text-slate-900">
                {listing.price}
              </span>
              <span className="text-sm text-slate-500">/night</span>
            </div>

            <Link
              href={`/book/${listing.id}`}
              className="mt-4 block rounded-lg bg-violet-500 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-violet-600"
            >
              Book now
            </Link>

            <Link
              href={`/properties/${listing.id}`}
              className="mt-2 block rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
