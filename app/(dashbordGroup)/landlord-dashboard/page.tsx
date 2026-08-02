import { getMe } from "@/services/getMe";
import React from "react";
import ProfileCard from "../dashboard/ProfileCard";

const LandlordDashbord = async () => {
  const user = await getMe();
  return (
    <div>
      <ProfileCard user={user?.data} />
    </div>
  );
};

export default LandlordDashbord;
