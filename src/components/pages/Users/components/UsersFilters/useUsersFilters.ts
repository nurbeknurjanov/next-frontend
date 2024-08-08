import { useForm } from 'react-hook-form';
import { IProps } from './UsersFilters';
import { IUserFilters } from 'api/usersApi';
import { useAppSelector } from 'store/hooks';
import { FormEvent, useEffect, useRef } from 'react';
import { getUsersStateSelector } from 'store/users/selectors';
import { useTranslatedData } from 'shared/hooks';

export function useUsersFilters({ filters, setFilters }: IProps) {
  const previousFilters = useRef<IUserFilters | null>(null);
  const getUsersState = useAppSelector(getUsersStateSelector);

  const { sexOptions, statusOptions } = useTranslatedData();
  const defaultValues = { name: null, email: null, status: [] };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IUserFilters>({
    mode: 'onTouched',
    defaultValues,
  });

  useEffect(() => {
    Object.entries(filters).forEach(([key, value]) => {
      setValue(key as keyof typeof filters, value);
    });
  }, [filters, setValue]);

  const submitForm = (formData: IUserFilters) => setFilters(formData);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(submitForm)(event);
  };
  const onResetForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    handleSubmit(submitForm)(event);
  };

  useEffect(() => {
    if (getUsersState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getUsersState.isFetching]);

  return {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    isDirty,
    isValid,
    getUsersState,
    previousFilters,
    statusOptions,
  };
}
