'use client';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import styles from './products.module.scss';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useProducts } from './useProducts';
import { Link } from 'shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  ProductModal,
  ProductModalDelete,
  ProductsFilters,
} from './components';
import { withCleanHooks } from 'shared/hocs';
import { DATE_FORMAT } from 'shared/utils';
import { IProduct } from 'api/productsApi';
import { Alert } from '@mui/material';

let Products: FC = () => {
  const {
    tc,
    tp,
    data,
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

  const columns: GridColDef<IProduct>[] = [
    {
      field: 'name',
      headerName: tp('name'),
      renderCell: params => (
        <Link href={'/products/' + params.row._id}>{params.row.name}</Link>
      ),
      flex: 1,
    },
    {
      field: 'description',
      headerName: tp('description'),
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: tc('createdDate'),
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'updatedAt',
      headerName: tc('updatedDate'),
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: params => [
        <GridActionsCellItem
          key={params.row._id}
          icon={<EditIcon color={'primary'} />}
          onClick={() => setShowModal({ type: 'update', id: params.row._id })}
          label={tc('update')}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.row._id}
          icon={<DeleteIcon color={'error'} />}
          onClick={() => setShowModal({ type: 'delete', id: params.row._id })}
          label={tc('delete')}
          showInMenu
        />,
      ],
    },
    /*{
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => (
        <>
          <EditIcon
            color={'primary'}
            sx={{ cursor: 'pointer' }}
            onClick={setSelectedIdToUpdate.bind(null, params.row._id)}
          />
          <DeleteIcon
            color={'error'}
            sx={{ cursor: 'pointer' }}
            onClick={() => setSelectedIdToDelete(params.row._id)}
          />
        </>
      ),
    },*/
  ];

  return (
    <>
      <div className={styles.productsContent}>
        <ProductsFilters filters={filters} setFilters={setFilters} />

        {!data?.list?.length ? (
          <Alert severity={'warning'} variant="outlined">
            No products
          </Alert>
        ) : (
          <DataGrid
            rows={data.list}
            getRowId={el => el._id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  page: data.pagination.pageNumber ?? 0,
                  pageSize: data.pagination.pageSize ?? 12,
                },
              },
            }}
            onPaginationModelChange={({ page, pageSize }) =>
              setPagination({ pageNumber: page, pageSize })
            }
            pageSizeOptions={[12, 24, 48]}
            paginationMode={'server'}
            rowCount={data.pagination.total || 0}
            sortingMode={'server'}
            onSortModelChange={setSorting}
            sortModel={sorting}
          />
        )}
      </div>

      {showModal?.type === 'create' && (
        <ProductModal
          type="create"
          onClose={closeShowModal}
          refreshList={refreshList}
        />
      )}

      {showModal?.type === 'update' && (
        <ProductModal
          type="update"
          id={showModal.id}
          onClose={closeShowModal}
          refreshList={refreshList}
        />
      )}

      {showModal?.type === 'delete' && (
        <ProductModalDelete
          id={showModal.id}
          onClose={closeShowModal}
          refreshList={refreshList}
        />
      )}
    </>
  );
};

Products = withCleanHooks(Products);

export { Products };
