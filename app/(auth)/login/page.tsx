"use client";
import TextField from "@/components/fileds/TextField";
import { GenericForm } from "@/components/form/GenericForm";
import { GenericFormRef } from "@/components/form/type";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import z from "zod";

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string(),
});
type FormType = z.infer<typeof formSchema>;
const initialValues: FormType = {
  email: "john.doe@example.com",
  password: "******",
};

export function LoginPage() {
  const formRef = useRef<GenericFormRef<FormType>>(null);

  const onSubmit = (data: FormType) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <div className="w-full h-screen flex flex-col space-y-4 items-center justify-center">
      <div className="max-w-7xl mx-auto shadow-lg p-10">
        <GenericForm
          schema={formSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          mode={"onSubmit"}
          ref={formRef}
        >
          <div className="space-y-4">
            <TextField<FormType> name="email" type="email" label="Email" />
            <TextField<FormType>
              name="password"
              type="password"
              label="Password"
            />

            <Button type="submit">Submit</Button>
          </div>
        </GenericForm>
      </div>
    </div>
  );
}

export default LoginPage;
