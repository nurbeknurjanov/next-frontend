import { useForm } from 'react-hook-form';
import { IProps } from './ProductsFilters';
import { IProductFilters } from 'api/productsApi';
import { useAppSelector } from 'store/hooks';
import { products } from 'store';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export function useProductsFilters({ filters, setFilters }: IProps) {
  const tCommon = useTranslations('Common');
  const tProduct = useTranslations('Product');

  const previousFilters = useRef<IProductFilters | null>(null);
  const getProductsState = useAppSelector(products.getProducts.selector.state);

  const defaultValues = { name: null, description: null, ...filters };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<IProductFilters>({
    mode: 'onTouched',
    defaultValues,
  });

  const submitForm = (formData: IProductFilters) => {
    setFilters(formData);
  };

  useEffect(() => {
    if (getProductsState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getProductsState.isFetching]);

  return {
    tCommon,
    tProduct,
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    getProductsState,
    previousFilters,
  };
}
