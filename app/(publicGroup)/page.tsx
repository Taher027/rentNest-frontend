import React from "react";
import RentNestBanner from "./-components/home/Banner";
import FeaturedListings from "./-components/home/FeaturedListings";

const HomePage = () => {
  return (
    <>
      <RentNestBanner />
      <div className="max-w-7xl mx-auto">
        <FeaturedListings />
      </div>
    </>
  );
};

export default HomePage;
