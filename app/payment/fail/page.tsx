// app/payment/fail/page.tsx
import Link from "next/link";
import { XCircle } from "lucide-react";

type PageProps = {
  searchParams: Promise<{ transactionId?: string }>;
};

export default async function PaymentFailPage({ searchParams }: PageProps) {
  const { transactionId } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <XCircle className="h-9 w-9 text-red-600" />
      </div>

      <h1 className="text-xl font-semibold text-slate-900">Payment failed</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        Your payment could not be completed. No amount has been charged. You can
        try again from your bookings.
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

