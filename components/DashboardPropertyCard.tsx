"use client";

import { Pencil, Trash2, MapPin, Tag, Hash, Home } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TListingProperties } from "@/lib/types";

const categoryStyles: Record<string, string> = {
  Apartment:
    "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-900",
  House:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  Commercial:
    "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-900",
  Land: "bg-lime-50 text-lime-700 border-lime-200 dark:bg-lime-950 dark:text-lime-300 dark:border-lime-900",
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-BD").format(amount);
}

type PropertyCardProps = {
  property: Omit<TListingProperties, "category"> & { category: string };
  onEdit: (
    property: Omit<TListingProperties, "category"> & { category: string },
  ) => void;
  onDelete: (
    property: Omit<TListingProperties, "category"> & { category: string },
  ) => void;
};

export function DashboardPropertyCard({
  property,
  onEdit,
  onDelete,
}: PropertyCardProps) {
  const categoryName = property.category || "Apartment";
  const badgeClass =
    categoryStyles[categoryName] ??
    "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <Card className="w-full max-w-sm overflow-hidden py-0 gap-0 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-10 w-10 shrink-0 rounded-xl bg-foreground flex items-center justify-center">
              <Home size={18} className="text-background" />
            </div>
            <div>
              <h3 className="font-semibold text-base leading-snug">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-muted-foreground text-xs">
                <Hash size={12} />
                <span>{property.id}</span>
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`shrink-0 rounded-full font-medium ${badgeClass}`}
          >
            {categoryName}
          </Badge>
        </div>
      </div>

      <div className="border-t" />

      {/* Details */}
      <div className="px-5 py-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Tag size={14} />
            Rent
          </span>
          <span className="font-semibold text-sm">
            ৳{formatPrice(property.price)}
            <span className="text-muted-foreground font-normal"> /month</span>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin size={14} />
            Location
          </span>
          <span className="text-sm text-right">{property.location}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 pt-1 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(property)}
        >
          <Pencil size={14} />
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-950"
            >
              <Trash2 size={14} />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Delete </AlertDialogTitle>
              <AlertDialogDescription>
                &quot;{property.title}&quot; Is delelted you can not find it
                again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                onClick={() => onDelete(property)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}
