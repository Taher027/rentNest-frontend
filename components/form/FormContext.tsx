"use client";

import { Control, FieldValues } from "react-hook-form";
import { createContext, useContext } from "react";

type GenericFormContextType<TFormValues extends FieldValues = FieldValues> = {
  control: Control<TFormValues>;
};

export const GenericFromContext = createContext<GenericFormContextType | null>(
  null,
);

export const useGenericFormContext = <
  TFormValues extends FieldValues = FieldValues,
>() => {
  const context = useContext(GenericFromContext);
  if (!context) {
    throw new Error(
      " useGenericFOrmContext must be used within a GenericFormProvider",
    );
  }
  return context.control as Control<TFormValues>;
};
