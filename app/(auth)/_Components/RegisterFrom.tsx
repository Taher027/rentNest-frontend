"use client";

import { useRef } from "react";
import z from "zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import TextField from "@/components/fileds/TextField";
import SelectField from "@/components/fileds/SelectField";
import { GenericForm } from "@/components/form/GenericForm";
import { GenericFormRef } from "@/components/form/type";
import { Button } from "@/components/ui/button";
import { registerAction } from "../_Actions/RegisterAction";

const ROLE_OPTIONS = [
  { value: "TENANT", label: "Tenant" },
  { value: "LANDLORD", label: "Landlord" },
];

const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm password" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    nidNumber: z.string().min(1, { message: "NID number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    avatar: z.url({ message: "Avatar must be a valid URL" }),
    role: z.string().min(1, { message: "Please select a role" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const formRef = useRef<GenericFormRef<RegisterFormValues>>(null);

  const handleSubmit = async (values: RegisterFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = values;

    const result = await registerAction(payload);

    if (result && result.success === false) {
      toast.error(result.error);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-slate-900">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Fill in your details to get started.
        </p>
      </div>

      <GenericForm
        schema={registerSchema}
        onSubmit={handleSubmit}
        mode="onSubmit"
        ref={formRef}
      >
        {(form) => {
          const isSubmitting = form.formState.isSubmitting;
          return (
            <div className="space-y-4">
              <TextField<RegisterFormValues> name="name" label="Full name" />

              <TextField<RegisterFormValues>
                name="email"
                type="email"
                label="Email"
              />

              <div className="grid grid-cols-2 gap-4">
                <TextField<RegisterFormValues>
                  name="password"
                  type="password"
                  label="Password"
                />
                <TextField<RegisterFormValues>
                  name="confirmPassword"
                  type="password"
                  label="Confirm password"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField<RegisterFormValues> name="phone" label="Phone" />
                <TextField<RegisterFormValues>
                  name="nidNumber"
                  label="NID number"
                />
              </div>

              <TextField<RegisterFormValues> name="address" label="Address" />

              <TextField<RegisterFormValues>
                name="avatar"
                type="url"
                label="Avatar URL"
              />

              <SelectField<RegisterFormValues>
                name="role"
                label="Register as"
                options={ROLE_OPTIONS}
                placeholder="Select a role"
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          );
        }}
      </GenericForm>
    </div>
  );
}

export default RegisterForm;
