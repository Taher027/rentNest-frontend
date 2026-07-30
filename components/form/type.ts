/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, Ref } from "react";
import {
  Control,
  DefaultValues,
  FieldValues,
  FormState,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

export type GenericFormRef<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  form: UseFormReturn<TFormValues>;
  formState: FormState<TFormValues>;
  getValues: () => TFormValues;
  setValue: (name: Path<TFormValues>, value: any) => void;
  reset: (values?: Partial<TFormValues> | undefined) => void;
};

export type GenericFromProps<TSchema extends FieldValues> = {
  children: ReactNode | ((methods: UseFormReturn<TSchema>) => ReactNode);
  schema: ZodType<TSchema, any, any>;
  initialValues?: DefaultValues<TSchema>;
  onSubmit: SubmitHandler<TSchema>;
  ref?: Ref<GenericFormRef<TSchema>>;
  mode: "onChange" | "onBlur" | "onSubmit" | "all";
};
