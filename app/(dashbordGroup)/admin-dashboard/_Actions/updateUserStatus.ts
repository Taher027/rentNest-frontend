/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

type UpdateUserStatusResult =
  | { success: true; data: any }
  | { success: false; error: string };

export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "INACTIVE" | "BLOCKED",
): Promise<UpdateUserStatusResult> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
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
        error: result?.message || "Failed to update user status",
      };
    }

    revalidateTag("admin-users", "max");

    return { success: true, data: result.data };
  } catch (error) {
    console.error("updateUserStatus error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
};
