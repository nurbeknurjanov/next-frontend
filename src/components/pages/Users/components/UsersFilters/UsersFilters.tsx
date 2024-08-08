import { useUsersFilters } from './useUsersFilters';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Button } from 'shared/ui';
import React from 'react';
import { IUserFilters, SEX_ENUM } from 'api/usersApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { isEqual } from 'lodash';
//import { SelectChangeEvent } from '@mui/material/Select';

export interface IProps {
  filters: IUserFilters;
  setFilters: (_filters: IUserFilters) => void;
}
export const UsersFilters = ({ filters, setFilters }: IProps) => {
  const tCommon = useTranslations('Common');
  const tUser = useTranslations('User');

  const {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    setValue,
    isDirty,
    isValid,
    getUsersState,
    previousFilters,
    statusOptions,
    sexOptions,
  } = useUsersFilters({ filters, setFilters });

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmitForm} onReset={onResetForm}>
          <TextField
            label={tUser('name')}
            {...register('name')}
            InputLabelProps={{ shrink: !!watch('name') }}
          />
          <TextField
            label={tUser('email')}
            {...register('email')}
            InputLabelProps={{ shrink: !!watch('email') }}
          />

          <FormControl sx={{ mb: 2 }}>
            <FormLabel>{tUser('sex')}</FormLabel>
            <FormGroup
              {...register('sex')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const values = watch('sex') ?? [];
                if (event.target.checked) {
                  values.push(event.target.value as unknown as SEX_ENUM);
                } else {
                  const index = values.indexOf(
                    event.target.value as unknown as SEX_ENUM
                  );
                  values.splice(index, 1);
                }
                setValue('sex', values);
              }}
            >
              {Object.entries(sexOptions).map(([value, label]) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      checked={watch('sex')?.includes(
                        value as unknown as SEX_ENUM
                      )}
                      value={value}
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <InputLabel>{tUser('status')}</InputLabel>
            <Select
              label={tUser('status')}
              value={watch('status')}
              {...register('status')}
              multiple
            >
              {Object.entries(statusOptions).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
