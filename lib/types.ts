import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  nidNumber: string;
  address: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  status: "ACTIVE" | "INACTIVE" | "PENDING";
}

export interface Category {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Landlord {
  id: string;
  name: string;
  email: string;
  phone: string;
  nidNumber: string;
  [key: string]: string;
}

export type TListingProperties = {
  id: string;
  title: string;
  description: string;
  landlordId: string;
  categoryId: string;
  areaSize: string;
  bedRooms: number;
  category: Category;
  city: string;
  location: string;
  price: number;
  status: "RENTED" | "AVAILABLE" | string;
  images: string[];
  landlord: Landlord;
  createdAt: string;
  updatedAt: string;
  badge: string;
  rating: number;
};
export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export type NavbarProps = {
  user: UserProfile;
};
export type PropertyListingProps = {
  properties: TListingProperties[];
};
export type PropertyPayload = {
  title: string;
  description: string;
  categoryId: string;
  location: string;
  city: string;
  bedRooms: number;
  price: number;
  status: "AVAILABLE" | "RENTED" | "UNAVAILABLE";
  areaSize: number;
  badge: "FEATURED" | "TRENDING" | "POPULAR" | "VERIFIED" | "NOT_VERIFIED";
  images: string[];
};
