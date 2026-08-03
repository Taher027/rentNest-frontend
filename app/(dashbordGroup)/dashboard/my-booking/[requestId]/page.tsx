import React from "react";
import { TenantBookingCard } from "./TenantBookingCard";
import { getMyBookingDetails } from "../../_Actions/getMyBooking";

type PageProps = {
  params: Promise<{ requestId: string }>;
};

const page = async ({ params }: PageProps) => {
  const { requestId } = await params;
  const booking = await getMyBookingDetails(requestId);

  if (!booking) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8 text-center text-sm text-slate-500">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <TenantBookingCard booking={booking} />
    </div>
  );
};

export default page;
