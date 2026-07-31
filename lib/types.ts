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
