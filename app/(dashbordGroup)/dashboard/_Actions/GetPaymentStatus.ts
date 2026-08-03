"use server";

import { cookies } from "next/headers";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";

export const getPaymentStatus = async (
  rentalId: string,
): Promise<PaymentStatus | null> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/status/${rentalId}`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return null;

  const result = await res.json();
  return result?.data?.status ?? null;
};
