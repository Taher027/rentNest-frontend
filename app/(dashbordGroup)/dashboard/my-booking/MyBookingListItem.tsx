import Image from "next/image";
import Link from "next/link";
import { MapPin, CalendarRange } from "lucide-react";
import { MyBooking } from "../_Actions/getMyBooking";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function MyBookingListItem({ booking }: { booking: MyBooking }) {
  const statusClass =
    STATUS_STYLES[booking.status] ??
    "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <Link
      href={`/dashboard/my-booking/${booking.id}`}
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        {booking.property?.images?.[0] && (
          <Image
            src={booking.property.images[0]}
            alt={booking.property.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900">
          {booking.property?.title ?? "Property unavailable"}
        </h3>
        {booking.property?.location && (
          <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{booking.property.location}</span>
          </div>
        )}
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
          <CalendarRange className="h-3 w-3 shrink-0" />
          <span>
            {formatDate(booking.moveInDate)} → {formatDate(booking.moveOutDate)}
          </span>
        </div>
      </div>

      <span
        className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass}`}
      >
        {booking.status}
      </span>
    </Link>
  );
}
