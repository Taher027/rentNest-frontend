import React from "react";
import RentNestBanner from "./-components/home/Banner";
import FeaturedListings from "./-components/home/FeaturedListings";
import BestPlacesToRent from "@/components/BestPlaceForRent";
import VerifiedOwners from "@/components/verifyOwner";

const HomePage = () => {
  return (
    <>
      <RentNestBanner />
      <div className="max-w-7xl mx-auto">
        <FeaturedListings />
        <BestPlacesToRent />
        <VerifiedOwners />
      </div>
    </>
  );
};

export default HomePage;
