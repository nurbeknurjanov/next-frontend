'use client';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import styles from './files.module.scss';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useFiles } from './useFiles';
import { Link } from 'shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
/*import {
  FileModalCreate,
  FileModalView,
  FileModalDelete,
  FilesFilters,
} from './components';*/
import { withCleanHooks } from 'shared/hocs';
import { DATE_FORMAT } from 'shared/utils';
import { IFile } from 'api/filesApi';
import { Alert } from '@mui/material';

let Files: FC = () => {
  const {
    tc,
    tm,
    getFilesState,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
    refreshList,
    showModal,
    setShowModal,
    closeShowModal,
  } = useFiles();

  const { data, isFetching } = getFilesState;

  const columns: GridColDef<IFile>[] = [
    {
      field: 'id',
      headerName: tm('id'),
      renderCell: params => (
        <Link href={'/files/' + params.row._id}>{params.row._id}</Link>
      ),
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: tc('createdAt'),
      flex: 1,
      valueGetter: params => dayjs(params.value).format(DATE_FORMAT),
    },
    {
      field: 'updatedAt',
      headerName: tc('updatedAt'),
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
          label={tc('view')}
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
      <div className={styles.filesContent}>
        {/*<FilesFilters filters={filters} setFilters={setFilters} />*/}

        {!data?.list?.length ? (
          <Alert severity={'warning'} variant="outlined">
            {tc('noData')}
          </Alert>
        ) : (
          <DataGrid
            rows={data.list}
            getRowId={el => el._id}
            columns={columns}
            loading={isFetching}
            paginationModel={{
              page: data.pagination.pageNumber ?? 0,
              pageSize: data.pagination.pageSize ?? 12,
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

      {/*{showModal?.type === 'create' && (
        <FileModalCreate onClose={closeShowModal} refreshList={refreshList} />
      )}

      {showModal?.type === 'delete' && (
        <FileModalDelete
          id={showModal.id}
          onClose={closeShowModal}
          refreshList={refreshList}
        />
      )}

      {showModal?.type === 'view' && (
        <FileModalView id={showModal.id} onClose={closeShowModal} />
      )}*/}
    </>
  );
};

Files = withCleanHooks(Files);

export { Files };
