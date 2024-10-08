import { useFilesFilters } from './useFilesFilters';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Button } from 'shared/ui';
import React from 'react';
import { IFileFilters } from 'api/files';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';

export interface IProps {
  filters: IFileFilters;
  setFilters: (_filters: IFileFilters) => void;
  isLoading: boolean;
}
export const FilesFilters = ({ filters, setFilters, isLoading }: IProps) => {
  const tCommon = useTranslations('Common');
  const tProductPage = useTranslations('ProductPage');

  const { onSubmitForm, onResetForm, register, watch, isDirty, isValid } =
    useFilesFilters({ filters, setFilters });

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
            </Select>
          </FormControl>

          <TextField
            label={tProductPage('title')}
            {...register('modelSearch')}
            InputLabelProps={{ shrink: !!watch('modelSearch') }}
          />

          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty || !isValid}
            loading={isLoading}
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
