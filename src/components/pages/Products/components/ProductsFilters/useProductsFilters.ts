import { useForm } from 'react-hook-form';
import { IProps } from './ProductsFilters';
import { IProductFilters } from 'api/products';
import { FormEvent, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export function useProductsFilters({ filters, setFilters }: IProps) {
  const tCommon = useTranslations('Common');
  const tProduct = useTranslations('Product');

  const defaultValues: IProductFilters = { name: null, description: null };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IProductFilters>({
    mode: 'onTouched',
    defaultValues,
  });
  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  const submitForm = (formData: IProductFilters) => setFilters(formData);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(submitForm)(event);
  };
  const onResetForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset(defaultValues);
    handleSubmit(submitForm)(event);
  };

  return {
    tCommon,
    tProduct,
    onSubmitForm,
    onResetForm,
    register,
    isDirty,
    isValid,
    watch,
  };
}
