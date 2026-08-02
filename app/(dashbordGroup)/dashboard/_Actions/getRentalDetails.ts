import { cookies } from "next/headers";

export type RentalDetails = {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  moveOutDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
  message: string;
  createdAt: string;
  updatedAt: string;
  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    city: string;
    bedRooms: number;
    price: number;
    rating: number;
    badge: string;
    status: string;
    areaSize: string;
    images: string[];
    category?: { id: string; title: string };
  } | null;
  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  } | null;
} | null;

export const getRentalDetails = async (
  requestId: string,
): Promise<RentalDetails> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/${requestId}`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      next: { tags: [`rental-${requestId}`] },
    },
  );

  if (!res.ok) return null;

  const result = await res.json();
  return result?.data ?? null;
};
