"use client";

import { useRef } from "react";
import z from "zod";
import { Loader } from "lucide-react";
import TextField from "@/components/fileds/TextField";
import { GenericForm } from "@/components/form/GenericForm";
import { GenericFormRef } from "@/components/form/type";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  location: z.string().min(1, { message: "Location is required" }),
});

export type PropertyFormValues = z.infer<typeof formSchema>;

type PropertyFormProps = {
  defaultValues?: Partial<PropertyFormValues>;
  onSubmit: (values: PropertyFormValues) => void | Promise<void>;
  onCancel?: () => void;
};

export function PropertyEditForm({
  defaultValues,
  onSubmit,
  onCancel,
}: PropertyFormProps) {
  const formRef = useRef<GenericFormRef<PropertyFormValues>>(null);

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

            {/*
              Tomar SelectField/Combobox component thakle category-r jonno
              oita use koro, na thakle ekhon TextField diyei thak
            */}
            <TextField<PropertyFormValues> name="category" label="Category" />

            <TextField<PropertyFormValues>
              name="price"
              type="number"
              label="Price"
            />

            <TextField<PropertyFormValues> name="location" label="Location" />

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
