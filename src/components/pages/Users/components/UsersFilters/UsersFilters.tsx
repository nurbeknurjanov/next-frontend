import { useUsersFilters } from './useUsersFilters';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import * as React from 'react';
import { IUserFilters } from 'api/usersApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { isEqual } from 'lodash';

export interface IProps {
  filters: IUserFilters;
  setFilters: (_filters: IUserFilters) => void;
}
export const UsersFilters = ({ filters, setFilters }: IProps) => {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');

  const {
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    getUsersState,
    previousFilters,
  } = useUsersFilters({ filters, setFilters });

  return (
    <Card>
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(submitForm)(e);
          }}
          onReset={e => {
            e.preventDefault();
            reset({ name: null, email: null });
            submitForm({ name: null, email: null });
          }}
        >
          <TextField label={tUser('name')} {...register('name')} />
          <TextField label={tUser('email')} {...register('email')} />

          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty || !isValid}
            loading={
              getUsersState.isFetching &&
              !isEqual(filters, previousFilters.current)
            }
            sx={{ minWidth: 100 }}
          >
            {tCommon('search')}
          </Button>
          <Button type={'reset'} variant={'outlined'} sx={{ ml: 1 }}>
            {tCommon('reset')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
