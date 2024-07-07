'use client';
import { useProductsFilters } from './useProductsFilters';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import * as React from 'react';
import { IProductFilters } from 'api/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { isEqual } from 'lodash';

export interface IProps {
  filters: IProductFilters;
  setFilters: (_filters: IProductFilters) => void;
}
export const ProductsFilters = ({ filters, setFilters }: IProps) => {
  const {
    tCommon,
    tProduct,
    submitForm,
    register,
    handleSubmit,
    reset,
    isDirty,
    isValid,
    getProductsState,
    previousFilters,
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
            reset();
            submitForm({ name: null, description: null });
          }}
        >
          <TextField label={tProduct('name')} {...register('name')} />
          <TextField
            label={tProduct('description')}
            {...register('description')}
          />

          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!isDirty || !isValid}
            loading={
              getProductsState.isFetching &&
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
