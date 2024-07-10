import { useFilesFilters } from './useFilesFilters';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
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
  const tCommon = useTranslations('Common');
  const tFile = useTranslations('File');

  const {
    onSubmitForm,
    onResetForm,
    register,
    watch,
    isDirty,
    isValid,
    getFilesState,
    previousFilters,
  } = useFilesFilters({ filters, setFilters });

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmitForm} onReset={onResetForm}>
          <TextField
            label={tCommon('id')}
            {...register('id')}
            InputLabelProps={{ shrink: !!watch('id') }}
          />

          <FormControl sx={{ mb: 2 }}>
            <InputLabel>{tCommon('type')}</InputLabel>
            <Select
              label={tCommon('type')}
              {...register('type')}
              value={watch('type') ?? ''}
            >
              <MenuItem value={'image'}>{tCommon('image')}</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>

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
