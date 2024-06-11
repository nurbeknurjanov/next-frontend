import { useFilesFilters } from './useFilesFilters';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import * as React from 'react';
import { IFileFilters } from 'api/filesApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';
import { isEqual } from 'lodash';

export interface IProps {
  filters: IFileFilters;
  setFilters: (_filters: IFileFilters) => void;
}
export const FilesFilters = ({ filters, setFilters }: IProps) => {
  const tc = useTranslations('Common');
  const tp = useTranslations('File');

  const {
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    getFilesState,
    previousFilters,
  } = useFilesFilters({ filters, setFilters });

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
            reset({ name: null, description: null });
            submitForm({ name: null, description: null });
          }}
        >
          <TextField label={tp('name')} {...register('name')} />
          <TextField label={tp('description')} {...register('description')} />

          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty || !isValid}
            loading={
              getFilesState.isFetching &&
              !isEqual(filters, previousFilters.current)
            }
            sx={{ minWidth: 100 }}
          >
            {tc('search')}
          </Button>
          <Button type={'reset'} variant={'outlined'} sx={{ ml: 1 }}>
            {tc('reset')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
