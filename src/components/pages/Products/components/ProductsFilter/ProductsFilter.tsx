import { useProductsFilter } from './useProductsFilter';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import * as React from 'react';
import { IProductFilter } from 'api/productsApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslations } from 'next-intl';

export interface IProps {
  filter: IProductFilter;
  setFilter: (_filter: IProductFilter) => void;
}
export const ProductsFilter = ({ filter, setFilter }: IProps) => {
  const tc = useTranslations('Common');
  const tp = useTranslations('Product');

  const { submitForm, register, handleSubmit, reset, isDirty, isValid } =
    useProductsFilter({ filter, setFilter });

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
          >
            {tc('search')}
          </Button>
          <Button
            type={'reset'}
            variant={'outlined'}
            disabled={!isDirty}
            sx={{ ml: 1 }}
          >
            {tc('reset')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
