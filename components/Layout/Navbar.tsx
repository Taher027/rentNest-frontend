"use client";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LayoutDashboard, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/lib/types";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/services/logout";
import { toast } from "sonner";
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const userMenuItems = [
  { label: "Dashboard", icon: LayoutDashboard, action: "dashboard" },
  { label: "Profile", icon: User, action: "profile" },
  { label: "Settings", icon: Settings, action: "settings" },
];
const Navbar = ({ user }: { user: UserProfile }) => {
  const router = useRouter();
  const handleUserMenuAction = (action: string) => {
    if (action === "dashboard") {
      if (user.role === "TENANT") {
        router.push("/dashboard");
      } else if (user.role === "LANDLORD") {
        router.push("/landlord-dashboard");
      } else if (user.role === "ADMIN") {
        router.push("/admin-dashboard");
      }

      return;
    }
  };
  const handleLogout = async () => {
    await logout();
    toast.success("User logout successfull!");
    router.push("/login");
  };
  return (
    <nav className="border-b border-border z-50 bg-[#0d1a2b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0 outline-0">
            <span className="text-2xl font-bold  text-white">Rent Nest</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:items-center md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Dropdown */}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs  text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.action}
                      onClick={() => handleUserMenuAction(item.action)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => handleLogout()}>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-6">
              <Link
                href={"/login"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "px-5 py-2 h-auto",
                )}
              >
                login
              </Link>
              <Link
                href={"/register"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "px-5 py-2 h-auto",
                )}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
