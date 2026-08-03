"use server";

import { cookies } from "next/headers";

type InitiatePaymentResult =
  | { success: true; paymentUrl: string }
  | { success: false; error: string };

export const initiatePayment = async (
  rentalId: string,
): Promise<InitiatePaymentResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/initiate`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rentalRequestId: rentalId }),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result?.message || "Failed to start payment",
      };
    }

    const paymentUrl =
      result?.data?.paymentUrl ?? result?.data?.url ?? result?.data;

    if (!paymentUrl || typeof paymentUrl !== "string") {
      return { success: false, error: "Payment URL not received" };
    }

    return { success: true, paymentUrl };
  } catch (error) {
    console.error("initiatePayment error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
