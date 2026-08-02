"use client";

import { toast } from "sonner";
import {
  RentalRequestForm,
  RentalRequestFormValues,
} from "./RentalRequestForm";
import { createRentalRequest } from "../../_Actions/CreateRentalRequest";

type RentalRequestSectionProps = {
  propertyId: string;
  onSuccess?: () => void;
};

export function RentalRequestSection({
  propertyId,
  onSuccess,
}: RentalRequestSectionProps) {
  const handleSubmit = async (values: RentalRequestFormValues) => {
    const payload = {
      propertyId,
      moveInDate: new Date(values.moveInDate).toISOString(),
      moveOutDate: new Date(values.moveOutDate).toISOString(),
      message: values.message,
    };

    const result = await createRentalRequest(payload);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Rental request sent");
    onSuccess?.();
  };

  return <RentalRequestForm onSubmit={handleSubmit} />;
}
