/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

type RentalRequestPayload = {
  propertyId: string;
  moveInDate: string;
  moveOutDate: string;
  message: string;
};

type CreateRentalRequestResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const createRentalRequest = async (
  payload: RentalRequestPayload,
): Promise<CreateRentalRequestResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result?.message || "Failed to send rental request",
      };
    }

    revalidateTag("rental-requests", "max");

    return { success: true, data: result.data };
  } catch (error) {
    console.error("createRentalRequest error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
