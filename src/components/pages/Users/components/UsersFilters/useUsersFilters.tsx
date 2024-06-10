import { useForm } from 'react-hook-form';
import { IProps } from './UsersFilters';
import { IUserFilters } from 'api/usersApi';
import { useAppSelector } from 'store/hooks';
import { users } from 'store';
import { useEffect, useRef } from 'react';

export function useUsersFilters({ filters, setFilters }: IProps) {
  const previousFilters = useRef<IUserFilters | null>(null);
  const getUsersState = useAppSelector(users.getUsers.selector.state);

  const defaultValues = { ...{ name: null, email: null }, ...filters };
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<IUserFilters>({
    mode: 'onTouched',
    defaultValues,
  });

  const submitForm = (formData: IUserFilters) => {
    setFilters(formData);
  };

  useEffect(() => {
    if (getUsersState.isFetching) {
      previousFilters.current = filters;
    }
  }, [filters, getUsersState.isFetching]);

  return {
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    getUsersState,
    previousFilters,
  };
}
