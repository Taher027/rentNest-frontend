import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useGenericFormContext } from "../form/FormContext";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

type TextareaFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  rows?: number;
};

const TextareaField = <T extends FieldValues>({
  name,
  label,
  rows = 4,
}: TextareaFieldProps<T>) => {
  const control = useGenericFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Textarea
            {...field}
            id={name}
            value={field.value ?? ""}
            rows={rows}
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default TextareaField;
