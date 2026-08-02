/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { PropertyPayload } from "@/lib/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type CreatePostResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const createPost = async (
  payload: PropertyPayload,
): Promise<CreatePostResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties`,
      {
        method: "POST",
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
        error: result?.message || "Failed to create property",
      };
    }

    revalidateTag("landlord-properties", {
      expire: 0,
    });

    return { success: true, data: result.data };
  } catch (error) {
    console.error("createPost error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
