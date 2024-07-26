'use client';
import React, { FC } from 'react';
import { useProfile } from './useProfile';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import { withCleanHooks } from 'shared/hocs';
import { useSetPageData } from 'shared/hooks';
import { Button } from 'shared/ui';
import { ProfileModalUpdate } from './components';

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

let Profile: FC = () => {
  const {
    tCommon,
    tUser,
    tProfilePage,
    model,
    showModal,
    setShowModal,
    closeShowModal,
  } = useProfile();
  const title = tProfilePage('title');

  useSetPageData(
    title,
    [title],
    <>
      <Button
        variant={'contained'}
        size={'small'}
        onClick={() => setShowModal({ type: 'updateProfile' })}
      >
        Update profile
      </Button>
      <Button variant={'outlined'} size={'small'} onClick={() => {}}>
        Change password
      </Button>
    </>
  );

  const rows: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    rows.push({
      label: tCommon('id'),
      value: model._id,
    });
    rows.push({
      label: tUser('name'),
      value: model.name,
    });
    rows.push({
      label: tUser('email'),
      value: model.email,
    });
    rows.push({
      label: tUser('sex'),
      value: model.sex,
    });
    rows.push({
      label: tUser('age'),
      value: model.age,
    });
    rows.push({
      label: tUser('status'),
      value: model.status,
    });
    rows.push({
      label: tCommon('createdAt'),
      value: dayjs(model.createdAt).format(DATE_FORMAT),
    });
    rows.push({
      label: tCommon('updatedAt'),
      value: dayjs(model.updatedAt).format(DATE_FORMAT),
    });
  }

  return (
    <>
      <DataGrid
        columnHeaderHeight={0}
        hideFooter
        rows={rows}
        columns={columns}
        getRowId={el => el.label}
        paginationMode={'client'}
      />
      {showModal?.type === 'updateProfile' && (
        <ProfileModalUpdate onClose={closeShowModal} />
      )}
    </>
  );
};

Profile = withCleanHooks(Profile);

export { Profile };
