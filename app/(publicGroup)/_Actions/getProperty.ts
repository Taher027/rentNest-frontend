type TPropertyQuery = {
  searchTerm?: string;
  city?: string;
  categoryId?: string;
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  bedRooms?: string;
};

export const getProperties = async (query?: TPropertyQuery) => {
  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["properties"],
      },
    },
  );

  return res.json();
};
