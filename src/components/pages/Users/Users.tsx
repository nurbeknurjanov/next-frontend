'use client';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import styles from 'css/components/pages/products.module.scss';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useUsers } from './useUsers';
import { Link } from 'shared/ui';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserModal, UserModalDelete, UsersFilter } from './components';
import { withCleanHooks } from 'shared/hocs';
import { DATE_FORMAT } from 'shared/utils';
import { IUser } from 'api/userApi';
import { Alert } from '@mui/material';

let Users: FC = () => {
  const {
    data,
    setPagination,
    sorting,
    setSorting,
    filter,
    setFilter,
    refreshUsersList,
    selectedIdToUpdate,
    setSelectedIdToUpdate,
    selectedIdToDelete,
    setSelectedIdToDelete,
    showCreateModal,
    setShowCreateModal,
  } = useUsers();

  const columns: GridColDef<IUser>[] = [
    {
      field: 'name',
      headerName: 'Name',
      renderCell: params => (
        <Link href={'/users/' + params.row._id}>{params.row.name}</Link>
      ),
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
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
      type: 'actions',
      getActions: params => [
        <GridActionsCellItem
          key={params.row._id}
          icon={<EditIcon color={'primary'} />}
          onClick={() => setSelectedIdToUpdate(params.row._id)}
          label="Update"
          showInMenu
        />,
        <GridActionsCellItem
          key={params.row._id}
          icon={<DeleteIcon color={'error'} />}
          onClick={() => setSelectedIdToDelete(params.row._id)}
          label="Delete"
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
      <div className={styles.gamesContent}>
        <UsersFilter filter={filter} setFilter={setFilter} />
        <br />
        {!data?.list?.length ? (
          <Alert severity={'warning'} variant="outlined">
            No users
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
        <UserModal
          type="create"
          onClose={() => setShowCreateModal(false)}
          refreshUsersList={refreshUsersList}
        />
      )}

      {selectedIdToUpdate && (
        <UserModal
          type="update"
          id={selectedIdToUpdate}
          onClose={() => setSelectedIdToUpdate(null)}
          refreshUsersList={refreshUsersList}
        />
      )}

      {selectedIdToDelete && (
        <UserModalDelete
          id={selectedIdToDelete}
          onClose={() => setSelectedIdToDelete(null)}
          refreshUsersList={refreshUsersList}
        />
      )}
    </>
  );
};

Users = withCleanHooks(Users);

export { Users };
