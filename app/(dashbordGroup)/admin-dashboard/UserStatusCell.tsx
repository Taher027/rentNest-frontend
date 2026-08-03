"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserStatus } from "./_Actions/updateUserStatus";

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BLOCKED", label: "Blocked" },
];

export function UserStatusCell({
  userId,
  status,
}: {
  userId: string;
  status: string;
}) {
  const [value, setValue] = useState(status);
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextStatus: string) => {
    const previous = value;
    setValue(nextStatus);

    startTransition(async () => {
      const result = await updateUserStatus(
        userId,
        nextStatus as "ACTIVE" | "INACTIVE" | "BLOCKED",
      );

      if (!result.success) {
        toast.error(result.error);
        setValue(previous); // fail hole purono value e ferot
        return;
      }

      toast.success("Status updated");
    });
  };

  return (
    <Select value={value} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
