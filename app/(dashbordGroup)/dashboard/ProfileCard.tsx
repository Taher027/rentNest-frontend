"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { Mail, Phone, MapPin, User, CreditCard, Calendar } from "lucide-react";

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  nidNumber: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  avatar: string;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  isVerified: boolean;
  address: string;
  createdAt: string;
}

interface Props {
  user: IUser;
}

export default function ProfileCard({ user }: Props) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
        <Avatar className="h-28 w-28">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Badge>{user.role}</Badge>

            <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>
              {user.status}
            </Badge>

            {user.isVerified ? (
              <Badge className="bg-green-600">Verified</Badge>
            ) : (
              <Badge variant="outline">Not Verified</Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
        <InfoItem
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value={user.email}
        />

        <InfoItem
          icon={<Phone className="h-4 w-4" />}
          label="Phone"
          value={user.phone}
        />

        <InfoItem
          icon={<CreditCard className="h-4 w-4" />}
          label="NID"
          value={user.nidNumber}
        />

        <InfoItem
          icon={<MapPin className="h-4 w-4" />}
          label="Address"
          value={user.address}
        />

        <InfoItem
          icon={<User className="h-4 w-4" />}
          label="User ID"
          value={user.id}
        />

        <InfoItem
          icon={<Calendar className="h-4 w-4" />}
          label="Joined"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
      </CardContent>
    </Card>
  );
}

export function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 items-start border rounded-lg p-4">
      <div className="mt-1 text-muted-foreground">{icon}</div>

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className="font-medium break-all">{value}</p>
      </div>
    </div>
  );
}
