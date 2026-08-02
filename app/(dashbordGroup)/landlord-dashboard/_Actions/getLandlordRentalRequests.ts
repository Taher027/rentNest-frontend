import { cookies } from "next/headers";
import { getUserById } from "./getUserById";
import { getPropertiesDetails } from "@/app/(publicGroup)/_Actions/getPropertyDetails";

type RawRentalRequest = {
  id: string;
  tenantId: string;
  propertyId: string;
  moveInDate: string;
  moveOutDate: string;
  status: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export type EnrichedRentalRequest = RawRentalRequest & {
  tenant: Awaited<ReturnType<typeof getUserById>>;
  property: Awaited<ReturnType<typeof getPropertiesDetails>>;
};

export const getLandlordRentalRequests = async (): Promise<
  EnrichedRentalRequest[]
> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    next: { tags: ["rental-requests"] },
  });

  if (!res.ok) return [];

  const result = await res.json();
  const requests: RawRentalRequest[] = result?.data ?? [];

  // Protita request-er jonne tenant + property alada kore fetch kore merge kora
  const enriched = await Promise.all(
    requests.map(async (request) => {
      const [tenant, property] = await Promise.all([
        getUserById(request.tenantId),
        getPropertiesDetails(request.propertyId),
      ]);

      return { ...request, tenant, property };
    }),
  );

  return enriched;
};
