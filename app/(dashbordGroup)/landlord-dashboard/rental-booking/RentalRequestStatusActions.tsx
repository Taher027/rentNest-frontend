"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateRentalRequestStatus } from "../_Actions/updateRentalRequestStatus";

type RentalRequestStatusActionsProps = {
  requestId: string;
  status: string;
};

export function RentalRequestStatusActions({
  requestId,
  status,
}: RentalRequestStatusActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [actionType, setActionType] = useState<"APPROVED" | "REJECTED" | null>(
    null,
  );

  const handleUpdate = (nextStatus: "APPROVED" | "REJECTED") => {
    setActionType(nextStatus);
    startTransition(async () => {
      const result = await updateRentalRequestStatus(requestId, nextStatus);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(
        nextStatus === "APPROVED" ? "Request accepted" : "Request rejected",
      );
      router.refresh();
    });
  };

  // Pending na hole ar accept/reject dekhabo na, karon already decide hoye geche
  if (status !== "PENDING") {
    return null;
  }

  return (
    <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
      <Button
        size="sm"
        variant="outline"
        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        disabled={isPending}
        onClick={() => handleUpdate("REJECTED")}
      >
        {isPending && actionType === "REJECTED" ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <X className="h-4 w-4" />
        )}
        Reject
      </Button>
      <Button
        size="sm"
        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
        disabled={isPending}
        onClick={() => handleUpdate("APPROVED")}
      >
        {isPending && actionType === "APPROVED" ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}
        Accept
      </Button>
    </div>
  );
}
