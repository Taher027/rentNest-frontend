import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomeBanner from "../../../../public/homebanner.webp";

export default function RentNestBanner() {
  return (
    <section className=" relative h-[80vh] min-h-120 w-full overflow-hidden">
      {/* background image — replace src with your own file in /public,
          or keep this Unsplash url for now */}
      <Image
        src={HomeBanner}
        alt="Modern apartment building"
        fill
        sizes=""
        priority
        className="object-cover"
      />

      {/* dark gradient so the left-side text stays readable over the photo */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

      {/* content */}
      <div className="max-w-7xl mx-auto relative z-10 flex h-full  flex-col justify-center px-6 lg:px-12">
        <span className="w-fit rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          Find your next home
        </span>

        <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Rent, list, and manage homes — all in one place
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">
          RentNest connects tenants, landlords, and admins on a single trusted
          platform for hassle-free home rentals.
        </p>

        <Button asChild size="lg" className="mt-8 w-fit">
          <Link href="/listings">Book Now</Link>
        </Button>
      </div>
    </section>
  );
}
