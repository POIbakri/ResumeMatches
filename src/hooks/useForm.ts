import { useState, useCallback } from 'react';
import { z } from 'zod';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

interface UseFormProps<T> {
  initialValues: T;
  validationSchema?: z.ZodType<T>;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormProps<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
  });

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
    }));
  }, []);

  const validateField = useCallback(
    (field: keyof T, value: any) => {
      if (!validationSchema) return '';

      try {
        validationSchema.shape[field as string].parse(value);
        return '';
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors[0]?.message || '';
        }
        return '';
      }
    },
    [validationSchema]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (validationSchema) {
        try {
          validationSchema.parse(state.values);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const errors: Partial<Record<keyof T, string>> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                errors[err.path[0] as keyof T] = err.message;
              }
            });
            setState((prev) => ({ ...prev, errors }));
            return;
          }
        }
      }

      await onSubmit(state.values);
    },
    [state.values, validationSchema, onSubmit]
  );

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    setFieldValue,
    validateField,
    handleSubmit,
  };
}