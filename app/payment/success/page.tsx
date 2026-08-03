"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader } from "lucide-react";
import { getPaymentStatus } from "../../(dashbordGroup)/dashboard/_Actions/GetPaymentStatus";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const rentalRequestId = searchParams.get("rentalRequestId");

  const [status, setStatus] = useState<
    "checking" | "confirmed" | "unconfirmed"
  >(() => (rentalRequestId ? "checking" : "unconfirmed"));

  useEffect(() => {
    if (!rentalRequestId) return;

    let attempts = 0;
    const maxAttempts = 6; // ~18 shekonder moddhe koyekbar try korbe
    let cancelled = false;

    const check = () => {
      getPaymentStatus(rentalRequestId).then((result) => {
        if (cancelled) return;

        if (result === "PAID") {
          setStatus("confirmed");
          return;
        }

        attempts += 1;
        if (attempts < maxAttempts) {
          setTimeout(check, 3000);
        } else {
          setStatus("unconfirmed");
        }
      });
    };

    check();

    return () => {
      cancelled = true;
    };
  }, [rentalRequestId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        {status === "checking" && (
          <>
            <Loader className="mx-auto h-10 w-10 animate-spin text-slate-400" />
            <h1 className="mt-4 text-lg font-semibold text-slate-900">
              Confirming your payment...
            </h1>
            <p className="mt-1 text-sm text-slate-500">Please wait a moment.</p>
          </>
        )}

        {status === "confirmed" && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
            <h1 className="mt-4 text-lg font-semibold text-slate-900">
              Payment successful!
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Your booking has been paid for.
            </p>
            <Link
              href="/dashboard/my-booking"
              className="mt-6 inline-block w-full rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700"
            >
              View my bookings
            </Link>
          </>
        )}

        {status === "unconfirmed" && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-amber-500" />
            <h1 className="mt-4 text-lg font-semibold text-slate-900">
              Couldn&apos;t confirm payment
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              If money was deducted, please check your bookings or contact
              support.
            </p>
            <Link
              href="/dashboard/my-booking"
              className="mt-6 inline-block w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Go to my bookings
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
