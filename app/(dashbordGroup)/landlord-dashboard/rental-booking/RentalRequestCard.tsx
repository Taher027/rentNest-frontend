import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  CalendarRange,
  MessageSquareText,
} from "lucide-react";
import { EnrichedRentalRequest } from "../_Actions/getLandlordRentalRequests";
import { RentalRequestStatusActions } from "./RentalRequestStatusActions";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  CANCELLED: "bg-slate-100 text-slate-600 border-slate-200",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function RentalRequestCard({
  request,
}: {
  request: EnrichedRentalRequest;
}) {
  const statusClass =
    STATUS_STYLES[request.status] ??
    "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Property strip */}
      <div className="flex items-center gap-3 border-b border-slate-100 p-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          {request.property?.images?.[0] && (
            <Image
              src={request.property.images[0]}
              alt={request.property.title}
              fill
              sizes="56px"
              className="object-cover"
            />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {request.property?.title ?? "Property unavailable"}
          </h3>
          {request.property?.location && (
            <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{request.property.location}</span>
            </div>
          )}
        </div>
        <span
          className={`ml-auto shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass}`}
        >
          {request.status}
        </span>
      </div>

      <div className="p-4">
        {/* Tenant info */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
            {request.tenant?.avatar && (
              <Image
                src={request.tenant.avatar}
                alt={request.tenant.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">
              {request.tenant?.name ?? "Unknown tenant"}
            </p>
            <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-slate-500">
              {request.tenant?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {request.tenant.email}
                </span>
              )}
              {request.tenant?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {request.tenant.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <CalendarRange className="h-4 w-4 shrink-0 text-slate-400" />
          <span>
            {formatDate(request.moveInDate)} → {formatDate(request.moveOutDate)}
          </span>
        </div>

        {/* Message */}
        {request.message && (
          <div className="mt-3">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <MessageSquareText className="h-3.5 w-3.5" />
              Message
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              {request.message}
            </p>
          </div>
        )}

        {/* Accept / Reject */}
        <RentalRequestStatusActions
          requestId={request.id}
          status={request.status}
        />
      </div>
    </div>
  );
}
