import { cookies } from "next/headers";

export const getRentals = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/getme`, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    next: { tags: ["my-rentals"] },
  });

  if (!res.ok) return [];

  const result = await res.json();
  return result?.data ?? [];
};
