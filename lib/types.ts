export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  nidNumber: string;
  address: string;
  avatar: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  isVerified: boolean;
  role: "ADMIN" | "USER";
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
