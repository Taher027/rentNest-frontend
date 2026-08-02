import { cookies } from "next/headers";

export type TCategory = {
  id: string;
  title: string;
};

export const getAllCategories = async (): Promise<TCategory[]> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    next: { tags: ["categories"] },
  });

  const result = await res.json();

  return result?.data || [];
};
