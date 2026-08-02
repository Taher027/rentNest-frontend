import { getMyBookings } from "../_Actions/getMyBooking";
import { MyBookingListItem } from "./MyBookingListItem";

export default async function MyBookingsPage() {
  const bookings = await getMyBookings();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-xl font-semibold text-slate-900">My bookings</h1>
      <p className="mb-6 text-sm text-slate-500">
        {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
      </p>

      {bookings.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-400">
          You haven&apos;t made any rental requests yet.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <MyBookingListItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
