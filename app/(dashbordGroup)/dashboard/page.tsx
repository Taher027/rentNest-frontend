import { getMe } from "@/services/getMe";
import React from "react";
import ProfileCard from "./ProfileCard";

const ProfilePage = async () => {
  const result = await getMe();
  return (
    <div>
      <ProfileCard user={result?.data} />
    </div>
  );
};

export default ProfilePage;
