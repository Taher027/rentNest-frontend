"use client";

import { useRef } from "react";
import z from "zod";
import { CalendarRange, Loader, MessageSquareText, Send } from "lucide-react";
import DateField from "@/components/fileds/DateField";
import TextareaField from "@/components/fileds/TextareaField";
import { GenericForm } from "@/components/form/GenericForm";
import { GenericFormRef } from "@/components/form/type";
import { Button } from "@/components/ui/button";

const formSchema = z
  .object({
    moveInDate: z.string().min(1, { message: "Move-in date is required" }),
    moveOutDate: z.string().min(1, { message: "Move-out date is required" }),
    message: z.string().min(1, { message: "Message is required" }),
  })
  .refine((data) => new Date(data.moveOutDate) > new Date(data.moveInDate), {
    message: "Move-out date must be after move-in date",
    path: ["moveOutDate"],
  });

export type RentalRequestFormValues = z.infer<typeof formSchema>;

type RentalRequestFormProps = {
  defaultValues?: Partial<RentalRequestFormValues>;
  onSubmit: (values: RentalRequestFormValues) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
};

export function RentalRequestForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Send request",
}: RentalRequestFormProps) {
  const formRef = useRef<GenericFormRef<RentalRequestFormValues>>(null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex w-full items-center justify-center mt-5">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
            <CalendarRange className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Request to rent
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Share your preferred move-in window and a short message for the
              landlord.
            </p>
          </div>
        </div>

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
              <div className="space-y-5">
                {/* Dates */}
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <CalendarRange className="h-3.5 w-3.5" />
                    Stay dates
                  </div>
                  <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                    <DateField<RentalRequestFormValues>
                      name="moveInDate"
                      label="Move-in date"
                      min={today}
                    />
                    <DateField<RentalRequestFormValues>
                      name="moveOutDate"
                      label="Move-out date"
                      min={today}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <MessageSquareText className="h-3.5 w-3.5" />
                    Message to landlord
                  </div>
                  <TextareaField<RentalRequestFormValues>
                    name="message"
                    label="Message"
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-5">
                  {onCancel && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onCancel}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-1.5 bg-violet-600 hover:bg-violet-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {submitLabel}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          }}
        </GenericForm>
      </div>
    </div>
  );
}

export default RentalRequestForm;
