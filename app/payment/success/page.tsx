import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type PageProps = {
  // Next.js 15/16: searchParams is a Promise and must be awaited
  searchParams: Promise<{ transactionId?: string }>;
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const { transactionId } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="h-9 w-9 text-emerald-600" />
      </div>

      <h1 className="text-xl font-semibold text-slate-900">
        Payment successful
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Your payment has been confirmed. You can view the booking in your
        dashboard.
      </p>

      {transactionId && (
        <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 font-mono text-xs text-slate-500">
          Transaction: {transactionId}
        </p>
      )}

      <Link
        href="/dashboard/my-booking"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-violet-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
      >
        Go to my bookings
      </Link>
    </div>
  );
}
