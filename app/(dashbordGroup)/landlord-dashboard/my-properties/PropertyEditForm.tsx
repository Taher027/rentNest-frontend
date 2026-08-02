"use client";

import { useRef } from "react";
import z from "zod";
import { Loader } from "lucide-react";
import TextField from "@/components/fileds/TextField";
import SelectField from "@/components/fileds/SelectField";
import { GenericForm } from "@/components/form/GenericForm";
import { GenericFormRef } from "@/components/form/type";
import { Button } from "@/components/ui/button";

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
  areaSize: z.string().min(1, { message: "Area size is required" }),
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
};

export function PropertyEditForm({
  defaultValues,
  categories,
  onSubmit,
  onCancel,
}: PropertyFormProps) {
  const formRef = useRef<GenericFormRef<PropertyFormValues>>(null);

  const categoryOptions = categories?.map((c) => ({
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

            <TextField<PropertyFormValues>
              name="description"
              label="Description"
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

            <TextField<PropertyFormValues> name="areaSize" label="Area size" />

            <div className="flex justify-end gap-2 pt-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader className="animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        );
      }}
    </GenericForm>
  );
}

export default PropertyEditForm;
