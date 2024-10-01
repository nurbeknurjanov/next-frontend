import { useForm } from 'react-hook-form';
import { IProps } from './UsersFilters';
import { IUserFiltersForm } from 'api/users';
import { useAppSelector } from 'store/hooks';
import { FormEvent, useEffect, useRef } from 'react';
import { useTranslatedData } from 'shared/hooks';

export function useUsersFilters({ filters, setFilters }: IProps) {
  const previousFilters = useRef<IUserFiltersForm | null>(null);

  const { sexOptions, statusOptions } = useTranslatedData();
  const defaultValues: IUserFiltersForm = {
    name: null,
    email: null,
    status: [],
    sex: [],
    createdAt: [null, null],
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, isValid },
  } = useForm<IUserFiltersForm>({
    mode: 'onTouched',
    defaultValues,
  });

  useEffect(() => {
    Object.entries<IUserFiltersForm[keyof IUserFiltersForm]>(
      filters as unknown as {
        [s: string]: IUserFiltersForm[keyof IUserFiltersForm];
      }
    ).forEach(([key, value]) => {
      setValue(key as keyof IUserFiltersForm, value);
    });
  }, [filters, setValue]);

  const submitForm = (formData: IUserFiltersForm) => setFilters(formData);

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(submitForm)(event);
  };
  const onResetForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    handleSubmit(submitForm)(event);
  };

  /*useEffect(() => {
    if (getUsersState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getUsersState.isFetching]);*/

  return {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    setValue,
    isDirty,
    isValid,
    previousFilters,
    statusOptions,
    sexOptions,
  };
}
