import Navbar from "@/components/Layout/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/services/getMe";
import React from "react";
import DashboardSidebar from "./-component/DashboardSidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user.data} />
      <SidebarProvider>
        <div className="flex flex-1">
          <DashboardSidebar user={user?.data} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
