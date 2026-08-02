import { getRentals } from "./getRentals";
import { getRentalDetails, RentalDetails } from "./getRentalDetails";

export type MyBooking = NonNullable<RentalDetails>;

export const getMyBookings = async (): Promise<MyBooking[]> => {
  const rawBookings = await getRentals();

  const enriched = await Promise.all(
    rawBookings.map((booking) => getRentalDetails(booking.id)),
  );

  return enriched.filter((booking): booking is MyBooking => booking !== null);
};

export const getMyBookingDetails = async (
  requestId: string,
): Promise<MyBooking | null> => {
  return getRentalDetails(requestId);
};
