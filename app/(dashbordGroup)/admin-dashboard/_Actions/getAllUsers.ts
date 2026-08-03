import { cookies } from "next/headers";

export type TUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
};

export const getAllUsers = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    next: { tags: ["users"] },
  });

  if (!res.ok) return [];

  const result = await res.json();
  return result?.data ?? [];
};
