import { cookies } from "next/headers";

export type TenantProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
};

export const getUserById = async (
  id: string,
): Promise<TenantProfile | null> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${id}`,
    {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      next: { tags: [`user-${id}`] },
    },
  );

  if (!res.ok) return null;

  const result = await res.json();
  return result?.data ?? null;
};
