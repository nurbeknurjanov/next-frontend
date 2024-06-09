import { useForm } from 'react-hook-form';
import { IProps } from './ProductsFilters';
import { IProductFilters } from 'api/productsApi';
import { useAppSelector } from 'store/hooks';
import { products } from 'store';
import { useEffect, useRef } from 'react';

export function useProductsFilters({ filters, setFilters }: IProps) {
  const previousFilters = useRef<IProductFilters | null>(null);
  const getProductsState = useAppSelector(products.getProducts.selector.state);

  const defaultValues = { ...{ name: null, description: null }, ...filters };
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
