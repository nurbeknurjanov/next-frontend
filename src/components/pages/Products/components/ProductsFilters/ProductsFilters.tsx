'use client';
import { useProductsFilters } from './useProductsFilters';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import React from 'react';
import { IProductFilters } from 'api/products';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export interface IProps {
  filters: IProductFilters;
  setFilters: (_filters: IProductFilters) => void;
  isLoading: boolean;
}
export const ProductsFilters = ({ filters, setFilters, isLoading }: IProps) => {
  const {
    tCommon,
    tProduct,
    onSubmitForm,
    onResetForm,
    register,
    isDirty,
    isValid,
    watch,
  } = useProductsFilters({ filters, setFilters });

  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmitForm} onReset={onResetForm}>
          <TextField
            label={tProduct('name')}
            {...register('name')}
            InputLabelProps={{ shrink: !!watch('name') }}
          />
          <TextField
            label={tProduct('description')}
            {...register('description')}
            InputLabelProps={{ shrink: !!watch('description') }}
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
