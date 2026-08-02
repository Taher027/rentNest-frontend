"use server";

import { cookies } from "next/headers";

export const getAllLandlordProperties = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/request`,

    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["landlord-properties"],
      },
    },
  );
  const result = await res.json();

  return result;
};
