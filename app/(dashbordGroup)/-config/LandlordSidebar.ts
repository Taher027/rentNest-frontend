import { ISidebarItem } from "@/lib/types";
import { FilePlus, FileText, LayoutDashboard, SquarePlus } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    href: "/landlord-dashboard/my-properties",
    icon: FileText,
  },
  {
    label: "Add Properties",
    href: "/landlord-dashboard/add-properties",
    icon: FilePlus,
  },
  {
    label: "Rental Booking",
    href: "/landlord-dashboard/rental-booking",
    icon: SquarePlus,
  },
];
