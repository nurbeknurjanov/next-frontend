import { useForm } from 'react-hook-form';
import { IProps } from './ProductsFilters';
import { IProductFilters } from 'api/productsApi';
export function useProductsFilters({ filters, setFilters }: IProps) {
  const defaultValues = { ...{ name: null, description: null }, ...filters };
  const {
    watch,
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

  return {
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    watch,
  };
}
