import React from "react";
import RentNestBanner from "./-components/home/Banner";
import FeaturedListings from "./-components/home/Listing";

const HomePage = () => {
  return (
    <>
      <RentNestBanner />
      <div className="bg-[#F5F5F4]">
        <div className="max-w-7xl mx-auto ">
          <FeaturedListings />
        </div>
      </div>
    </>
  );
};

export default HomePage;
