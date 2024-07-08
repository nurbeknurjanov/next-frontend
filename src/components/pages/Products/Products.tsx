'use client';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import styles from './products.module.scss';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useProducts } from './useProducts';
import { Button, Link } from 'shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import {
  ProductModalCreate,
  ProductModalUpdate,
  ProductModalView,
  ProductModalDelete,
  ProductsFilters,
} from './components';
import { withCleanHooks } from 'shared/hocs';
import { DATE_FORMAT } from 'shared/utils';
import { IProduct } from 'api/productsApi';
import { useSetPageData } from 'shared/hooks';
import { useTranslations } from 'next-intl';

let Products: FC = () => {
  const {
    tCommon,
    tProduct,
    getProductsState,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    refreshList,
    showModal,
    setShowModal,
    closeShowModal,
  } = useProducts();

  const tps = useTranslations('ProductsPage');

  useSetPageData(
    tps('title'),
    [tps('title')],
    <Button
      variant={'contained'}
      size={'small'}
      onClick={() => setShowModal({ type: 'create' })}
    >
      {tps('create')}
    </Button>
  );

  const columns: GridColDef<IProduct>[] = [
    {
      field: 'name',
      headerName: tProduct('name'),
      renderCell: params => (
        <Link href={'/products/' + params.row._id}>{params.row.name}</Link>
      ),
      flex: 1,
    },
    {
      field: 'image',
      headerName: tCommon('image'),
      renderCell: params => {
        if (params.row.image) {
          return (
            <Link
              href={params.row.image.url}
              target={'_blank'}
              sx={{ fontSize: 0 }}
            >
              <img src={params.row.image.url} width={100} />
            </Link>
          );
        }
      },
      flex: 1,
    },
    {
      field: 'description',
      headerName: tProduct('description'),
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: tCommon('createdAt'),
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'updatedAt',
      headerName: tCommon('updatedAt'),
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: params => [
        <GridActionsCellItem
          key={params.row._id}
          icon={<DeleteIcon color={'primary'} />}
          onClick={() => setShowModal({ type: 'view', id: params.row._id })}
          label={tCommon('view')}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.row._id}
          icon={<EditIcon color={'warning'} />}
          onClick={() => setShowModal({ type: 'update', id: params.row._id })}
          label={tCommon('update')}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.row._id}
          icon={<DeleteIcon color={'error'} />}
          onClick={() => setShowModal({ type: 'delete', id: params.row._id })}
          label={tCommon('delete')}
          showInMenu
        />,
      ],
    },
  ];

  const { data, isFetching } = getProductsState;

  return (
    <>
      <div className={styles.productsContent}>
        <ProductsFilters filters={filters} setFilters={setFilters} />

        <DataGrid
          getRowHeight={params => {
            if (params.model.image) return 'auto';
          }}
          rows={data?.list ?? []}
          getRowId={el => el._id}
          columns={columns}
          loading={isFetching}
          paginationModel={{
            page: data?.pagination?.pageNumber ?? 0,
            pageSize: data?.pagination?.pageSize ?? 12,
          }}
          onPaginationModelChange={({ page, pageSize }) =>
            setPagination({ pageNumber: page, pageSize })
          }
          pageSizeOptions={[12, 24, 48]}
          rowCount={data?.pagination?.total ?? 0}
          onSortModelChange={setSorting}
          sortModel={sorting}
          slotProps={{
            pagination: {
              count: data?.pagination?.pageCount ?? 0,
              page: (data?.pagination?.pageNumber ?? 0) + 1,
              onChange: ((
                event: React.ChangeEvent<HTMLTableCellElement>,
                page: number
              ) => {
                setPagination({ pageNumber: page - 1, pageSize: 12 });
              }) as React.FormEventHandler<HTMLTableCellElement>,
            },
          }}
          slots={{
            pagination: Pagination,
          }}
        />
      </div>

      {showModal?.type === 'create' && (
        <ProductModalCreate
          onClose={closeShowModal}
          afterCreate={refreshList}
        />
      )}

      {showModal?.type === 'update' && (
        <ProductModalUpdate
          id={showModal.id}
          onClose={closeShowModal}
          afterUpdate={refreshList}
        />
      )}

      {showModal?.type === 'delete' && (
        <ProductModalDelete
          id={showModal.id}
          onClose={closeShowModal}
          afterDelete={refreshList}
        />
      )}

      {showModal?.type === 'view' && (
        <ProductModalView id={showModal.id} onClose={closeShowModal} />
      )}
    </>
  );
};

Products = withCleanHooks(Products);

export { Products };
