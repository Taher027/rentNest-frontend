import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Category = {
  title: string;
  count: number;
  image: string;
  href: string;
};

const CATEGORIES: Category[] = [
  {
    title: "Entire home",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    href: "/properties?category=entire-home",
  },
  {
    title: "Shared room",
    count: 4,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
    href: "/properties?category=shared-room",
  },
  {
    title: "Apartment",
    count: 4,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    href: "/properties?category=apartment",
  },
  {
    title: "B & B",
    count: 1,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
    href: "/properties?category=bnb",
  },
  {
    title: "Cabin",
    count: 2,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop",
    href: "/properties?category=cabin",
  },
];

function CategoryTile({
  category,
  className,
  imageHeight,
}: {
  category: Category;
  className?: string;
  imageHeight: string;
}) {
  return (
    <Link
      href={category.href}
      className={`group relative block overflow-hidden rounded-xl ${imageHeight} ${className ?? ""}`}
    >
      <Image
        src={category.image}
        alt={category.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{category.title}</h3>
          <p className="text-sm text-white/80">{category.count} Listings</p>
        </div>
        <span className="flex items-center gap-0.5 text-sm font-medium text-white">
          Discover
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function BestPlacesToRent() {
  const [entireHome, sharedRoom, apartment, bnb, cabin] = CATEGORIES;

  return (
    <section className="px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold text-slate-800">
          Best Places to Rent
        </h2>
        <p className="mt-1.5 text-slate-500">
          How to travel on a budget around the world
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <CategoryTile
            category={entireHome}
            className="sm:col-span-2"
            imageHeight="h-72"
          />
          <CategoryTile category={sharedRoom} imageHeight="h-72" />

          <CategoryTile category={apartment} imageHeight="h-60" />
          <CategoryTile category={bnb} imageHeight="h-60" />
          <CategoryTile category={cabin} imageHeight="h-60" />
        </div>
      </div>
    </section>
  );
}
