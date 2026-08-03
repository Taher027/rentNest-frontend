import Image from "next/image";
import {
  MapPin,
  CalendarRange,
  MessageSquareText,
  Home,
  BedDouble,
  Ruler,
} from "lucide-react";
import { MyBooking } from "../../_Actions/getMyBooking";
import { PaymentButton } from "./PaymentButton";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
};

const STATUS_MESSAGE: Record<string, string> = {
  PENDING: "Waiting for the landlord to respond.",
  APPROVED: "Your request has been accepted!",
  REJECTED: "Your request was not accepted.",
  CANCELLED: "This request was cancelled.",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function TenantBookingCard({ booking }: { booking: MyBooking }) {
  const statusClass =
    STATUS_STYLES[booking.status] ??
    "bg-slate-100 text-slate-600 border-slate-200";
  const statusMessage = STATUS_MESSAGE[booking.status] ?? "";
  const isApproved = booking.status === "APPROVED";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Property strip */}
      <div className="flex items-center gap-3 border-b border-slate-100 p-4">
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
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {booking.property?.title ?? "Property unavailable"}
          </h3>
          {booking.property?.location && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{booking.property.location}</span>
            </div>
          )}
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {booking.property?.badge === "FEATURED" && (
            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
              Featured
            </span>
          )}
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass}`}
          >
            {booking.status}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Status message */}
        <p className="text-sm text-slate-600">{statusMessage}</p>

        {/* Quick facts */}
        {booking.property && (
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              <span>{booking.property.category?.title ?? "Property"}</span>
            </div>
            <div className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              <span>{booking.property.bedRooms} bed rooms</span>
            </div>
            <div className="flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5" />
              <span>{booking.property.areaSize} sqft</span>
            </div>
            {booking.property.price && (
              <div className="flex items-center gap-1">
                <span>${booking.property.price}/night</span>
              </div>
            )}
          </div>
        )}

        {/* Dates */}
        {(booking.moveInDate || booking.moveOutDate) && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <CalendarRange className="h-4 w-4 shrink-0 text-slate-400" />
            <span>
              {formatDate(booking.moveInDate)} →{" "}
              {formatDate(booking.moveOutDate)}
            </span>
          </div>
        )}

        {/* Message */}
        {booking.message && (
          <div className="mt-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <MessageSquareText className="h-3.5 w-3.5" />
              Your message
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {booking.message}
            </p>
          </div>
        )}

        {/* Pay now / Paid — sudhu APPROVED status e dekhabe */}
        {isApproved && (
          <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
            <PaymentButton rentalId={booking.id} />
          </div>
        )}
      </div>
    </div>
  );
}
