/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";

type UpdatePostResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const updatePost = async (
  id: string,
  payload: Record<string, any>,
): Promise<UpdatePostResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/properties/${id}`,
      {
        method: "PUT",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result?.message || "Failed to update property",
      };
    }

    updateTag("landlord-properties");

    return { success: true, data: result.data };
  } catch (error) {
    console.error("updatePost error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
