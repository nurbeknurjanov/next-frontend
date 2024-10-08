'use client';
import { useForm } from 'react-hook-form';
import { IProps } from './FilesFilters';
import { IFileFilters } from 'api/files';
import { useEffect, FormEvent } from 'react';

export function useFilesFilters({
  filters,
  setFilters,
}: Pick<IProps, 'filters' | 'setFilters'>) {
  const defaultValues = { id: null, type: null, modelSearch: null };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IFileFilters>({
    mode: 'onTouched',
    defaultValues,
  });
  useEffect(() => {
    Object.entries<IFileFilters[keyof IFileFilters]>(filters).forEach(
      ([key, value]) => {
        setValue(key as keyof IFileFilters, value);
      }
    );
  }, [filters, setValue]);

  const submitForm = (formData: IFileFilters) => setFilters(formData);
  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(submitForm)(event);
  };
  const onResetForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    handleSubmit(submitForm)(event);
  };

  return {
    onSubmitForm,
    onResetForm,
    register,
    reset,
    watch,
    isDirty,
    isValid,
  };
}
