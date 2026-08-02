import React from "react";
import { TListingProperties } from "@/lib/types";
import { PropertyListing } from "./PropertyListing";
import { getAllLandlordProperties } from "../_Actions/getAllLandlordProperties";
import { getAllCategories } from "../_Actions/GetCategory";

const MyProperties = async () => {
  const data = await getAllLandlordProperties();
  const categories = await getAllCategories();
  const propertyList: TListingProperties[] = data?.data || [];

  return (
    <div className="p-5 md:p-10">
      <PropertyListing
        properties={propertyList}
        categories={categories} // <-- prop hishebe pass korchi
      />
    </div>
  );
};

export default MyProperties;
