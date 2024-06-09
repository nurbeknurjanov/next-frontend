'use client';
import React, { FC } from 'react';
import styles from './product.module.scss';
import { useProduct } from './useProduct';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import { withCleanHooks } from 'shared/hocs';
import Loading from 'app/[locale]/loading';

const columns: GridColDef[] = [
  {
    field: 'label',
    headerName: 'Label',
    renderCell: params => params.value,
    flex: 1,
  },
  {
    field: 'value',
    headerName: 'Value',
    width: 1200,
    renderCell: params => {
      if (['background', 'icon_2', 'icon_3'].includes(params.row.label)) {
        return (
          <img src={params.value} width={300} style={{ margin: '20px 0' }} />
        );
      }

      if (['createdAt', 'updatedAt'].includes(params.row.label)) {
        return dayjs(params.value).format(DATE_FORMAT);
      }

      return params.value;
    },
    flex: 1,
  },
];

let Product: FC = () => {
  const { model, getProductState } = useProduct();

  const data: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    const entries = Object.entries(model);
    entries
      .filter(([key]) => key !== '__v')
      .forEach(([key, value]) => {
        if (typeof value === 'object') {
          data.push({
            label: key,
            value: JSON.stringify(value),
          });
        } else {
          data.push({
            label: key,
            value: value,
          });
        }
      });
  }

  if (getProductState.isFetching) {
    return <Loading />;
  }

  return (
    <div className={styles.productContent}>
      <DataGrid
        hideFooter
        rows={data}
        columns={columns}
        getRowId={el => el.label}
      />
    </div>
  );
};

Product = withCleanHooks(Product);

export { Product };
