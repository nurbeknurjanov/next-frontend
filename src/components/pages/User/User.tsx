'use client';
import React, { FC } from 'react';
import styles from './user.module.scss';
import { useUser } from './useUser';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import { withCleanHooks } from 'shared/hocs';
import Loading from 'app/[locale]/loading';
import { useSetPageData } from '../../../shared/hooks';

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

let User: FC = () => {
  const { tUsersPage, model, getUserState } = useUser();
  const title = model?.name!;

  useSetPageData(title, [
    {
      label: tUsersPage('title'),
      href: '/users',
    },
    title,
  ]);

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

  if (getUserState.isFetching) {
    return <Loading />;
  }

  return (
    <div className={styles.userContent}>
      <DataGrid
        hideFooter
        rows={data}
        columns={columns}
        getRowId={el => el.label}
      />
    </div>
  );
};

User = withCleanHooks(User);

export { User };
