"use client";
import TextField from "@/components/fileds/TextField";
import { GenericForm } from "@/components/form/GenericForm";
import { GenericFormRef } from "@/components/form/type";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRef } from "react";
import z from "zod";
import { loginAction } from "../_Actions/AuthActions";

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string(),
});
type FormType = z.infer<typeof formSchema>;

export function LoginPage() {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const onSubmit = async (data: FormType) => {
    await loginAction(data);
  };

  return (
    <div className="w-full h-screen flex flex-col space-y-4 items-center justify-center">
      <div className="max-w-7xl mx-auto shadow-lg p-10">
        <GenericForm
          schema={formSchema}
          onSubmit={onSubmit}
          mode={"onSubmit"}
          ref={formRef}
        >
          {(form) => {
            const isSubmitting = form.formState.isSubmitting;
            return (
              <div className="space-y-4">
                <TextField<FormType> name="email" type="email" label="Email" />
                <TextField<FormType>
                  name="password"
                  type="password"
                  label="Password"
                />

                <Button type="submit">
                  {isSubmitting ? (
                    <Loader className="animate-spin" />
                  ) : (
                    " Login"
                  )}
                </Button>
              </div>
            );
          }}
        </GenericForm>
      </div>
    </div>
  );
}

export default LoginPage;
