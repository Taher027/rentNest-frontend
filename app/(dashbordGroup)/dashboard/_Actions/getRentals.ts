import { cookies } from "next/headers";

export type RawRental = {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  moveOutDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  message: string;
  createdAt: string;
  updatedAt: string;
};

export const getRentals = async (): Promise<RawRental[]> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
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
