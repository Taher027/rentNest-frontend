/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Control,
  DefaultValues,
  FieldValues,
  Path,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { GenericFromProps } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useImperativeHandle } from "react";
import { GenericFromContext } from "./FormContext";

export const GenericForm = <TSchema extends FieldValues>({
  children,
  schema,
  initialValues = {} as DefaultValues<TSchema>,
  onSubmit,
  mode = "onSubmit",
  ref,
}: GenericFromProps<TSchema>) => {
  const form = useForm<TSchema>({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
    mode,
  });
  useImperativeHandle(
    ref,
    () => ({
      control: form.control,
      form,
      formState: form.formState,
      getValues: form.getValues,
      setValue: (name: Path<TSchema>, value: TSchema[Path<TSchema>]) =>
        form.setValue(name, value),
      reset: (values?: Partial<TSchema> | undefined) =>
        form.reset(values as TSchema),
    }),
    [form],
  );
  return (
    <GenericFromContext value={{ control: form.control as Control<any> }}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {typeof children === "function"
          ? (children as (methods: UseFormReturn<TSchema>) => ReactNode)(form)
          : children}
      </form>
    </GenericFromContext>
  );
};
