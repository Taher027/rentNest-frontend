import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard } from "lucide-react";
import { LANDLORD_SIDEBAR_ITEMS } from "./LandlordSidebar";
import { ADMIN_SIDEBAR_ITEMS } from "./AdminSidebar";

const USER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Rentals",
    href: "/dashboard/rentals",
    icon: FileText,
  },
];

export const sidebarMenuItems = {
  TENANT: USER_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
