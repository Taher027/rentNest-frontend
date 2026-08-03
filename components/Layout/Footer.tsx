import Image from "next/image";
import Link from "next/link";
import { Home, Phone, Mail, Monitor } from "lucide-react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTiktok,
  FaRss,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const FEATURED_LISTINGS = [
  {
    title: "Sunset Ridge Hideaway",
    location: "District of Columbia, Washington",
    price: 225,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop",
    href: "/properties/sunset-ridge-hideaway",
  },
  {
    title: "Modern Seashell Loft",
    location: "District of Columbia, Washington",
    price: 225,
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=400&auto=format&fit=crop",
    href: "/properties/modern-seashell-loft",
  },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaWhatsapp, href: "#", label: "WhatsApp" },
  { icon: FaTiktok, href: "#", label: "TikTok" },
  { icon: FaRss, href: "#", label: "RSS feed" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 px-6 py-14 lg:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
        {/* Currency + About */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Change Currency
          </h3>
          <select className="mt-3 w-full max-w-45 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300">
            <option>USD</option>
            <option>BDT</option>
            <option>EUR</option>
          </select>

          <h3 className="mt-8 text-sm font-semibold text-slate-800">
            About RentNest
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We&apos;re committed to delivering a high level of expertise,
            customer service, and attention to detail.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Find your next home with confidence. Verified listings, verified
            owners.
          </p>
        </div>

        {/* Featured listings */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Featured Listings
          </h3>
          <div className="mt-4 space-y-4">
            {FEATURED_LISTINGS.map((listing) => (
              <Link
                key={listing.title}
                href={listing.href}
                className="flex items-start gap-3 group"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-violet-600">
                    {listing.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {listing.location}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-700">
                    <span className="font-medium">${listing.price}</span>
                    <span className="text-slate-400">/night</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-2.5">
              <Home className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              <span>
                3755 Commercial St SE Salem, Corner with Sunny Boulevard
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-slate-400" />
              <span>(305) 555-4446</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <a
                href="mailto:email@yourdomain.com"
                className="hover:text-violet-600"
              >
                email@yourdomain.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Monitor className="h-4 w-4 shrink-0 text-slate-400" />
              <Link href="/" className="hover:text-violet-600">
                RentNest
              </Link>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-violet-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
        <p>Copyright RentNest. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/terms" className="hover:text-violet-600">
            Terms and Conditions
          </Link>
          <Link href="/contact" className="hover:text-violet-600">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
