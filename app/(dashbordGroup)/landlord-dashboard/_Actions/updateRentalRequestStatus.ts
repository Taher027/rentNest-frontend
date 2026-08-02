"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

type UpdateStatusResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const updateRentalRequestStatus = async (
  requestId: string,
  status: "APPROVED" | "REJECTED",
): Promise<UpdateStatusResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/${requestId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result?.message || "Failed to update request status",
      };
    }

    revalidateTag("rental-requests", "max");

    return { success: true, data: result.data };
  } catch (error) {
    console.error("updateRentalRequestStatus error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
