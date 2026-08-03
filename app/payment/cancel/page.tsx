"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const rentalRequestId = searchParams.get("rentalRequestId");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-4 text-lg font-semibold text-slate-900">
          Payment cancelled
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          You cancelled the payment. You can try again anytime.
        </p>
        <Link
          href={
            rentalRequestId
              ? `/dashboard/my-booking/${rentalRequestId}`
              : "/dashboard/my-booking"
          }
          className="mt-6 inline-block w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Back to my bookings
        </Link>
      </div>
    </div>
  );
}
