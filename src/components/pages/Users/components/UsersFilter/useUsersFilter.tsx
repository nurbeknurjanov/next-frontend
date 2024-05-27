import { useForm } from 'react-hook-form';
import { IProps } from './UsersFilter';
import { UserFilter } from 'api/userApi';
export function useUsersFilter({ setFilter, filter }: IProps) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<UserFilter>({
    mode: 'onTouched',
    defaultValues: filter,
  });

  const submitForm = (formData: UserFilter) => setFilter(formData);

  return {
    submitForm,
    register,
    handleSubmit,
    isDirty,
    isValid,
    watch,
  };
}
