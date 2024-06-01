'use client';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import styles from '../Products/products.module.scss';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useFiles } from './useFiles';
import { Link } from 'shared/ui';
//import { FilesFilter } from './components';
import { withCleanHooks } from 'shared/hocs';
import { DATE_FORMAT } from 'shared/utils';
import { IFile } from 'api/fileApi';
import { Alert } from '@mui/material';
import { FileModal, FileModalDelete } from './components';
import DeleteIcon from '@mui/icons-material/Delete';

let Files: FC = () => {
  const {
    data,
    setPagination,
    sorting,
    setSorting,
    filter: _filters,
    setFilter: _setFilters,
    showCreateModal,
    setShowCreateModal,
    selectedIdToDelete,
    setSelectedIdToDelete,
    refreshFilesList,
  } = useFiles();

  const columns: GridColDef<IFile>[] = [
    {
      field: 'url',
      headerName: 'Preview',
      renderCell: params => (
        <Link href={params.row.url} target={'_blank'}>
          <img style={{ maxHeight: 200, maxWidth: 200 }} src={params.row.url} />
        </Link>
      ),
      flex: 2,
    },
    {
      field: 'assetId',
      headerName: 'Asset ID',
      flex: 1,
    },
    {
      field: 'deleted',
      headerName: 'Is deleted',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created date',
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated date',
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => (
        <DeleteIcon
          color={'error'}
          sx={{ cursor: 'pointer' }}
          onClick={() => setSelectedIdToDelete(params.row._id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className={styles.gamesContent}>
        <br />
        {!data?.list?.length ? (
          <Alert severity={'warning'} variant="outlined">
            No files
          </Alert>
        ) : (
          <DataGrid
            rows={data.list}
            getRowId={el => el._id!}
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
              setPagination({ pageNumber: page, pageSize: pageSize })
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
      {showCreateModal && (
        <FileModal
          onClose={() => setShowCreateModal(false)}
          refreshFilesList={refreshFilesList}
        />
      )}
      {selectedIdToDelete && (
        <FileModalDelete
          id={selectedIdToDelete}
          onClose={() => setSelectedIdToDelete(null)}
          refreshFilesList={refreshFilesList}
        />
      )}
    </>
  );
};

Files = withCleanHooks(Files);

export { Files };
