import { useProductsFilters } from './useProductsFilters';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import * as React from 'react';
import { IProductFilters } from 'api/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';

export interface IProps {
  filters: IProductFilters;
  setFilters: (_filters: IProductFilters) => void;
}
export const ProductsFilters = ({ filters, setFilters }: IProps) => {
  const tc = useTranslations('Common');
  const tp = useTranslations('Product');

  const {
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    getProductsState,
  } = useProductsFilters({ filters, setFilters });

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
            loading={getProductsState.isFetching}
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
