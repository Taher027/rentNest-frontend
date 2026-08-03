import { getMe } from "@/services/getMe";
import React from "react";
import ProfileCard from "./ProfileCard";

const ProfilePage = async () => {
  const user = await getMe();
  return (
    <div>
      <ProfileCard user={user?.data} />
    </div>
  );
};

export default ProfilePage;
