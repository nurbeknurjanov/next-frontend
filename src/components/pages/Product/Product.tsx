'use client';
import React, { FC } from 'react';
import styles from './product.module.scss';
import { useProduct } from './useProduct';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import { withCleanHooks } from 'shared/hocs';
import Loading from 'app/[locale]/loading';
import { ProductModalDelete } from './components';
import { useTranslations } from 'next-intl';

const columns: GridColDef[] = [
  {
    field: 'label',
    headerName: 'Label',
    flex: 1,
  },
  {
    field: 'value',
    headerName: 'Value',
    flex: 1,
  },
];

let Product: FC = () => {
  const tc = useTranslations('Common');
  const tm = useTranslations('Product');
  const { model, getProductState, showModal, setShowModal } = useProduct();

  const rows: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    rows.push({
      label: tc('id'),
      value: model._id,
    });
    rows.push({
      label: tm('name'),
      value: model.name,
    });
    rows.push({
      label: tm('description'),
      value: model.description,
    });
    rows.push({
      label: tc('createdAt'),
      value: dayjs(model.createdAt).format(DATE_FORMAT),
    });
    rows.push({
      label: tc('updatedAt'),
      value: dayjs(model.updatedAt).format(DATE_FORMAT),
    });
  }

  if (getProductState.isFetching) {
    return <Loading />;
  }

  return (
    <div className={styles.productContent}>
      <DataGrid
        hideFooter
        rows={rows}
        columns={columns}
        getRowId={el => el.label}
      />

      {showModal?.type === 'delete' && (
        <ProductModalDelete
          id={showModal.id}
          onClose={() => setShowModal(null)}
        />
      )}
    </div>
  );
};

Product = withCleanHooks(Product);

export { Product };
