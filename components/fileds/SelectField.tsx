"use client";

import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useGenericFormContext } from "../form/FormContext";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Option = { value: string; label: string };

type SelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  options: Option[];
  placeholder?: string;
};

const SelectField = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select...",
}: SelectFieldProps<T>) => {
  const control = useGenericFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        // field.value যদি undefined/null হয়, তবে Shadcn সিলেক্ট ক্র্যাশ রোধে empty string নিশ্চিত করুন
        const safeValue =
          typeof field.value === "string"
            ? field.value
            : String(field.value ?? "");

        return (
          <Field>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <Select
              value={safeValue}
              onValueChange={(val) => {
                // ফর্ম-এ ভ্যালু সেভ করার প্রক্রিয়া নিশ্চিত করা
                field.onChange(val);
              }}
            >
              <SelectTrigger
                id={name}
                aria-invalid={fieldState.invalid}
                className="w-full"
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options && options.length > 0 ? (
                  options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-xs text-muted-foreground text-center">
                    No options available
                  </div>
                )}
              </SelectContent>
            </Select>
            {fieldState.invalid && fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        );
      }}
    />
  );
};

export default SelectField;
