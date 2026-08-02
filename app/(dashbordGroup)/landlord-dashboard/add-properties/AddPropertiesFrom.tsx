"use client";

import { useRef } from "react";
import z from "zod";
import { Loader } from "lucide-react";
import TextField from "@/components/fileds/TextField";
import SelectField from "@/components/fileds/SelectField";
import { GenericForm } from "@/components/form/GenericForm";
import { GenericFormRef } from "@/components/form/type";
import { Button } from "@/components/ui/button";
import TextareaField from "@/components/fileds/TextareaField";

const BADGE_OPTIONS = [
  { value: "FEATURED", label: "Featured" },
  { value: "TRENDING", label: "Trending" },
  { value: "POPULAR", label: "Popular" },
  { value: "VERIFIED", label: "Verified" },
  { value: "NOT_VERIFIED", label: "Not verified" },
];

const STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "RENTED", label: "Rented" },
  { value: "UNAVAILABLE", label: "Unavailable" },
];

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  city: z.string().min(1, { message: "City is required" }),
  bedRooms: z.coerce
    .number()
    .int()
    .positive({ message: "Bed rooms must be a positive number" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  areaSize: z.coerce
    .number()
    .positive({ message: "Area size must be a positive number" }),
  badge: z.string().min(1, { message: "Badge is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  imageUrl: z.string().url({ message: "Enter a valid image URL" }),
});

export type PropertyFormValues = z.infer<typeof formSchema>;

type CategoryOption = {
  id: string;
  title: string;
};

type PropertyFormProps = {
  defaultValues?: Partial<PropertyFormValues>;
  categories: CategoryOption[];
  onSubmit: (values: PropertyFormValues) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
};

export function AddPropertyForm({
  defaultValues,
  categories,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: PropertyFormProps) {
  const formRef = useRef<GenericFormRef<PropertyFormValues>>(null);

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.title,
  }));

  return (
    <GenericForm
      schema={formSchema}
      onSubmit={onSubmit}
      initialValues={defaultValues}
      mode="onSubmit"
      ref={formRef}
    >
      {(form) => {
        const isSubmitting = form.formState.isSubmitting;
        return (
          <div className="space-y-4">
            <TextField<PropertyFormValues> name="title" label="Title" />

            <TextareaField<PropertyFormValues>
              name="description"
              label="Description"
              rows={4}
            />

            <SelectField<PropertyFormValues>
              name="categoryId"
              label="Category"
              options={categoryOptions}
              placeholder="Select a category"
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField<PropertyFormValues> name="location" label="Location" />
              <TextField<PropertyFormValues> name="city" label="City" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TextField<PropertyFormValues>
                name="bedRooms"
                type="number"
                label="Bed rooms"
              />
              <TextField<PropertyFormValues>
                name="price"
                type="number"
                label="Price"
              />
            </div>

            <TextField<PropertyFormValues>
              name="areaSize"
              type="number"
              label="Area size"
            />

            <TextField<PropertyFormValues>
              name="imageUrl"
              type="url"
              label="Image URL"
            />

            <div className="grid grid-cols-2 gap-4">
              <SelectField<PropertyFormValues>
                name="badge"
                label="Badge"
                options={BADGE_OPTIONS}
                placeholder="Select a badge"
              />
              <SelectField<PropertyFormValues>
                name="status"
                label="Status"
                options={STATUS_OPTIONS}
                placeholder="Select a status"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader className="animate-spin" />
                ) : (
                  submitLabel
                )}
              </Button>
            </div>
          </div>
        );
      }}
    </GenericForm>
  );
}

export default AddPropertyForm;
