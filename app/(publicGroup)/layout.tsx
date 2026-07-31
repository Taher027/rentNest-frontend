import Navbar from "@/components/Layout/Navbar";
import { getMe } from "@/services/getMe";
import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  console.log(user, "inside layout");
  return (
    <div>
      <Navbar user={user.data} />
      {children}
    </div>
  );
};

export default PublicLayout;
