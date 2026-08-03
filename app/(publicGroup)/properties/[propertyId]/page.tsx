import React from "react";
import { getPropertiesDetails } from "../../_Actions/getPropertyDetails";
import { PropertyDetailsCard } from "../-compnents/PropertyCardDetails";

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) => {
  const { propertyId } = await params;
  const data = await getPropertiesDetails(propertyId);

  return (
    <div>
      <PropertyDetailsCard listing={data?.data} />
    </div>
  );
};

export default PropertyDetails;
