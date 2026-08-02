import React from "react";
import { RentalRequestSection } from "./RentalRequest";

type PageProps = {
  searchParams: Promise<{ propertyId?: string }>;
};

const RentalRequestPage = async ({ searchParams }: PageProps) => {
  const { propertyId } = await searchParams;

  if (!propertyId) {
    return (
      <div className="mx-auto max-w-xl px-4 py-8 text-center text-sm text-slate-500">
        No property selected.
      </div>
    );
  }

  return (
    <div>
      <RentalRequestSection propertyId={propertyId} />
    </div>
  );
};

export default RentalRequestPage;
