"use client";

import { toast } from "sonner";
import AddPropertyForm, { PropertyFormValues } from "./AddPropertiesFrom";
import { PropertyPayload } from "@/lib/types";
import { createPost } from "../_Actions/CreatePost";

// Test er jonne dummy category list — real app e getAllCategories() theke asbe
const DUMMY_CATEGORIES = [
  { id: "7c795bd1-cfb9-4f7c-a03e-02dce3d39b8e", title: "Apartment" },
  { id: "8d795bd1-cfb9-4f7c-a03e-02dce3d39b8d", title: "House" },
  { id: "9e795bd1-cfb9-4f7c-a03e-02dce3d39b8e", title: "Commercial" },
];

export default function AddPropertyPage() {
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
    console.log(result);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Property created");
    // revalidateTag already "createPost" er ভেতরে hoye jay, ekhane আলাদা kore
    // revalidate call korar দরকার nei
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-xl font-semibold mb-6">Add property</h1>

      <AddPropertyForm
        categories={DUMMY_CATEGORIES}
        submitLabel="Create"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
