import { useProductsFilter } from './useProductsFilter';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import * as React from 'react';
import { IProductFilter } from 'api/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export interface IProps {
  filter: IProductFilter;
  setFilter: (_filter: IProductFilter) => void;
}
export const ProductsFilter = ({ filter, setFilter }: IProps) => {
  const { submitForm, register, handleSubmit, isDirty, isValid } =
    useProductsFilter({ filter, setFilter });

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
          <TextField label={'Description'} {...register('description')} />

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
