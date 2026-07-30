import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useGenericFormContext } from "../form/FormContext";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: "text" | "email" | "number" | "url" | "password";
};

const TextField = <T extends FieldValues>({
  name,
  label,
  type = "text",
}: TextFieldProps<T>) => {
  const control = useGenericFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            {...field}
            id={name}
            type={type}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          {fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default TextField;
