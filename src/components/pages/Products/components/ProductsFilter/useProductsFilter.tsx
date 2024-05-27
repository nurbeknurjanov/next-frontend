import { useForm } from 'react-hook-form';
import { IProps } from './ProductsFilter';
import { IProductFilter } from 'api/productsApi';
export function useProductsFilter({ setFilter, filter }: IProps) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IProductFilter>({
    mode: 'onTouched',
    defaultValues: filter,
  });

  const submitForm = (formData: IProductFilter) => setFilter(formData);

  return {
    submitForm,
    register,
    handleSubmit,
    isDirty,
    isValid,
    watch,
  };
}
