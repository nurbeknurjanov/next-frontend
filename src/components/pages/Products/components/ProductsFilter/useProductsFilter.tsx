import { useForm } from 'react-hook-form';
import { IProps } from './ProductsFilter';
import { IProductFilter } from 'api/productsApi';
export function useProductsFilter({ setFilter, filter }: IProps) {
  const defaultValues = { ...{ name: null, description: null }, ...filter };
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<IProductFilter>({
    mode: 'onTouched',
    defaultValues,
  });

  const submitForm = (formData: IProductFilter) => {
    setFilter(formData);
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
