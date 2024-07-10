'use client';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import styles from './files.module.scss';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useFiles } from './useFiles';
import { Button, Link } from 'shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
/*import {
  FileModalCreate,
  FileModalView,
  FileModalDelete,
  FilesFilters,
} from './components';*/
import { withCleanHooks } from 'shared/hocs';
import { DATE_FORMAT } from 'shared/utils';
import { IFile } from 'api/filesApi';
import { useSetPageData } from '../../../shared/hooks';

let Files: FC = () => {
  const {
    tCommon,
    tFiles,
    tFile,
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

  useSetPageData(tFiles('title'), [tFiles('title')]);

  const { data, isFetching } = getFilesState;

  const columns: GridColDef<IFile>[] = [
    {
      field: 'id',
      headerName: tCommon('image'),
      renderCell: params => (
        <Link
          href={'/files/' + params.row._id}
          target={'_blank'}
          sx={{ fontSize: 0 }}
        >
          <img src={params.row.url} width={100} />
        </Link>
      ),
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
      headerName: tCommon('actions'),
      renderCell: params => (
        <DeleteIcon
          color={'error'}
          sx={{ cursor: 'pointer' }}
          onClick={() => setShowModal({ type: 'delete', id: params.row._id })}
        />
      ),
    },
  ];

  return (
    <>
      <div className={styles.filesContent}>
        {/*<FilesFilters filters={filters} setFilters={setFilters} />*/}

        <DataGrid
          getRowHeight={_params => 'auto'}
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
          rowCount={data?.pagination?.total || 0}
          onSortModelChange={setSorting}
          sortModel={sorting}
          slotProps={{
            pagination: {
              labelRowsPerPage: tCommon('rowsPerPage:'),
            },
          }}
        />
      </div>

      {/*{showModal?.type === 'create' && (
        <FileModalCreate onClose={closeShowModal} refreshList={refreshList} />
      )}



      {showModal?.type === 'view' && (
        <FileModalView id={showModal.id} onClose={closeShowModal} />
      )}*/}
    </>
  );
};

Files = withCleanHooks(Files);

export { Files };
