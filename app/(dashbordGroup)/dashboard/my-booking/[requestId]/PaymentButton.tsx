"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPaymentStatus } from "../../_Actions/GetPaymentStatus";
import { initiatePayment } from "../../_Actions/InitiatePayment";

type PaymentButtonProps = {
  rentalId: string;
  initialPaid?: boolean;
};

export function PaymentButton({
  rentalId,
  initialPaid = false,
}: PaymentButtonProps) {
  const [isPaid, setIsPaid] = useState(initialPaid);
  const [isChecking, setIsChecking] = useState(!initialPaid);
  const [isPending, startTransition] = useTransition();

  // Page load hole (payment gateway theke ferot ashuk ba na ashuk) shobshomoy
  // backend theke real payment status check kore neya, guess kora query
  // param-er upor bhorosha na kore
  useEffect(() => {
    if (initialPaid) return;

    let active = true;
    getPaymentStatus(rentalId).then((status) => {
      if (!active) return;
      if (status === "PAID") {
        setIsPaid(true);
        toast.success("Payment successful!");
      }
      setIsChecking(false);
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePay = () => {
    startTransition(async () => {
      const result = await initiatePayment(rentalId);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      window.location.href = result.paymentUrl;
    });
  };

  if (isPaid) {
    return (
      <Button
        size="sm"
        disabled
        className="gap-1.5 bg-emerald-600 hover:bg-emerald-600"
      >
        <CheckCircle2 className="h-4 w-4" />
        Paid
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      onClick={handlePay}
      disabled={isPending || isChecking}
      className="gap-1.5 bg-violet-600 hover:bg-violet-700 cursor-pointer"
    >
      {isPending || isChecking ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <CreditCard className="h-4 w-4" />
      )}
      Pay now
    </Button>
  );
}
