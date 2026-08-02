"use client";

import { useState } from "react";

import { TListingProperties } from "@/lib/types";
import { DashboardPropertyCard } from "@/components/DashboardPropertyCard";
import { Modal } from "@/components/Layout/modal/Modal";
import PropertyEditForm, { PropertyFormValues } from "./PropertyEditForm";

type Property = Omit<TListingProperties, "category"> & { category: string };

type PropertyListingProps = {
  properties: TListingProperties[];
};

function normalizeProperty(property: TListingProperties): Property {
  const category = property.category;
  return {
    ...property,
    category: typeof category === "object" ? (category?.title ?? "") : category,
  };
}

export function PropertyListing({ properties }: PropertyListingProps) {
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
    // TODO: API call diye backend theke delete koro
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
            defaultValues={editTarget}
            onSubmit={async (values: PropertyFormValues) => {
              setItems((prev) =>
                prev.map((p) =>
                  p.id === editTarget.id ? { ...p, ...values } : p,
                ),
              );
              // TODO: API call diye backend update koro
              setEditOpen(false);
            }}
            onCancel={() => setEditOpen(false)}
          />
        )}
      </Modal>
    </>
  );
}
