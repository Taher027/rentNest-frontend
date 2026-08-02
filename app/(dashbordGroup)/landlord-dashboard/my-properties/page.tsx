import { getAllLandlordProperties } from "@/services/getAllLandlordProperties";
import React from "react";
import { TListingProperties } from "@/lib/types";
import { PropertyListing } from "./PropertyListing";

const MyProperties = async () => {
  const data = await getAllLandlordProperties();
  const propertyList: TListingProperties[] = data?.data || [];

  return (
    <div className="p-5 md:p-10">
      <PropertyListing properties={propertyList} />
    </div>
  );
};

export default MyProperties;
