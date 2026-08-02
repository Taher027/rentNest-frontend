/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";

import { TListingProperties } from "@/lib/types";
import { DashboardPropertyCard } from "@/components/DashboardPropertyCard";
import { Modal } from "@/components/Layout/modal/Modal";
import PropertyEditForm, { PropertyFormValues } from "./PropertyEditForm";
import { updatePost } from "../_Actions/EditMyProperties";

type CategoryOption = {
  id: string;
  title: string;
};

type Property = Omit<TListingProperties, "category"> & {
  category: string;
  categoryId: string;
};

type PropertyListingProps = {
  properties: TListingProperties[];
  categories: CategoryOption[];
};

function normalizeProperty(property: TListingProperties): Property {
  const category = property.category;
  const isObject = typeof category === "object" && category !== null;
  return {
    ...property,
    category: isObject ? (category?.title ?? "") : (category as string),
    categoryId: isObject
      ? ((category as any)?.id ?? "")
      : ((property as any)?.categoryId ?? ""),
  };
}

export function PropertyListing({
  properties,
  categories,
}: PropertyListingProps) {
  const [items, setItems] = useState<Property[]>(
    properties.map(normalizeProperty),
  );

  const [editTarget, setEditTarget] = useState<Property | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = (property: Property) => {
    setEditTarget(property);
    setEditOpen(true);
  };

  const handleDelete = (property: Property) => {
    setItems((prev) => prev.filter((p) => p.id !== property.id));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((property) => (
          <DashboardPropertyCard
            key={property.id}
            property={property}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit property"
        description={
          editTarget ? `"${editTarget.title}" er details update koro.` : ""
        }
      >
        {editTarget && (
          <PropertyEditForm
            // FIX 2: categories ekhon pass korchi -> select e option dekhabe
            categories={categories}
            // FIX 1: form categoryId chai, tai categoryId ta defaultValues e dicchi
            defaultValues={{
              ...editTarget,
              categoryId: editTarget.categoryId,
            }}
            onSubmit={async (values: PropertyFormValues) => {
              const result = await updatePost(editTarget.id, values);

              if (!result.success) {
                toast.error(result.error);
                console.log(result);
                return;
              }

              setItems((prev) =>
                prev.map((p) =>
                  p.id === editTarget.id ? { ...p, ...values } : p,
                ),
              );
              toast.success("Property updated");
              setEditOpen(false);
            }}
            onCancel={() => setEditOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}
