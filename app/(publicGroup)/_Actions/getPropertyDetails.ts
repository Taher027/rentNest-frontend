"use server";

export const getPropertiesDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // 1day
        tags: ["properties"],
      },
    },
  );
  const result = await res.json();

  return result;
};
