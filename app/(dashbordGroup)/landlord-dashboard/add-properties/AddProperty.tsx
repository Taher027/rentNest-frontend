/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import AddPropertyForm, { PropertyFormValues } from "./AddPropertiesFrom";
import { PropertyPayload } from "@/lib/types";
import { createPost } from "../_Actions/CreatePost";

export default function AddPropertyPage({ category }: any) {
  const handleSubmit = async (values: PropertyFormValues) => {
    const payload: PropertyPayload = {
      title: values.title,
      description: values.description,
      categoryId: values.categoryId,
      location: values.location,
      city: values.city,
      bedRooms: values.bedRooms,
      price: values.price,
      status: values.status as PropertyPayload["status"],
      areaSize: values.areaSize,
      badge: values.badge as PropertyPayload["badge"],
      images: [values.imageUrl],
    };

    const result = await createPost(payload);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Property created");
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-xl font-semibold mb-6">Add property</h1>

      <AddPropertyForm
        categories={category}
        submitLabel="Create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
