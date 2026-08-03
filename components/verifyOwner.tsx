import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";

type Owner = {
  name: string;
  role: string;
  image: string;
  rating: number;
};

const OWNERS: Owner[] = [
  {
    name: "Lilia Demo",
    role: "Verified and Superhost",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Janet Rose",
    role: "Verified and Superhost",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Michael Douglas",
    role: "Verified and Superhost",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function OwnerCard({ owner }: { owner: Owner }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="relative h-72 w-full">
        <Image
          src={owner.image}
          alt={owner.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-white/90 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-slate-700" />
        </div>
      </div>

      <div className="p-4">
        <StarRating rating={owner.rating} />
        <h3 className="mt-2 text-base font-semibold text-slate-800">
          {owner.name}
        </h3>
        <p className="mt-0.5 text-sm text-slate-500">{owner.role}</p>
      </div>
    </div>
  );
}

export default function VerifiedOwners() {
  return (
    <section className="px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold text-slate-800">
          Verified Owners
        </h2>
        <p className="mt-1.5 text-slate-500">
          Highlight the most popular owners
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OWNERS.map((owner) => (
            <OwnerCard key={owner.name} owner={owner} />
          ))}
        </div>
      </div>
    </section>
  );
}
