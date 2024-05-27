'use client';
import React, { FC } from 'react';
import { useUser } from './useUser';
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
    renderCell: params => {
      if (['createdAt', 'updatedAt'].includes(params.row.label)) {
        return dayjs(params.value).format(DATE_FORMAT);
      }

      return params.value;
    },
    flex: 1,
  },
];

let User: FC = () => {
  const { model, aggStates } = useUser();

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

  if (aggStates.isFetching) {
    return <Loading />;
  }

  return (
    <DataGrid
      hideFooter
      rows={data}
      columns={columns}
      getRowId={el => el.label}
    />
  );
};

User = withCleanHooks(User);

export { User };
