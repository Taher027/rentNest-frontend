import { getProperties } from "@/app/(publicGroup)/_Actions/getProperty";
import React from "react";
import FeaturedListings from "../-components/home/Listing";

const PropertyPage = async () => {
  const properties = await getProperties();
  console.log(properties);
  return (
    <div className="max-w-7xl mx-auto p ">
      <FeaturedListings />
    </div>
  );
};

export default PropertyPage;
