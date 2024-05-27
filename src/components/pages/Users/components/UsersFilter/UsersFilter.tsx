import { useUsersFilter } from './useUsersFilter';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import * as React from 'react';
import { UserFilter } from 'api/userApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export interface IProps {
  filter: UserFilter;
  setFilter: (_filter: UserFilter) => void;
}
export const UsersFilter = ({ filter, setFilter }: IProps) => {
  const { submitForm, register, handleSubmit, isDirty, isValid } =
    useUsersFilter({ filter, setFilter });

  return (
    <Card>
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(submitForm)(e);
          }}
        >
          <TextField label={'Name'} {...register('name')} />
          <TextField label={'Email'} {...register('email')} />

          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty && !isValid}
          >
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
