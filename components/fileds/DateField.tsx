import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useGenericFormContext } from "../form/FormContext";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type DateFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  min?: string;
};

const DateField = <T extends FieldValues>({
  name,
  label,
  min,
}: DateFieldProps<T>) => {
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
            value={field.value ?? ""}
            type="date"
            min={min}
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

export default DateField;
