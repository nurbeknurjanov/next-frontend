import React, { FC } from 'react';
import { useUserModel } from 'components/pages/User';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslations } from 'next-intl';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';

export type IProps = {
  id: string;
  onClose: () => void;
};

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

export const UserModalView: FC<IProps> = ({ onClose, id }) => {
  const tc = useTranslations('Common');
  const tp = useTranslations('UserPage');
  const tm = useTranslations('User');
  const { model, getUserState } = useUserModel({
    id,
  });

  const data: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    const entries = Object.entries(model);
    entries
      .filter(([key]) => key !== '__v')
      .forEach(([key, value]) => {
        if (typeof value === 'object') {
          data.push({
            label: tm(key),
            value: JSON.stringify(value),
          });
        } else {
          data.push({
            label: tm(key),
            value: value,
          });
        }
      });
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tp('view')}</DialogTitle>
      <DialogContent>
        {/*<DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>*/}

        {/*<input ref={el => (this.inputElement = el)} />*/}

        {getUserState.isFetching ? (
          <CircularProgress sx={{ mx: 'auto', mb: 2, display: 'block' }} />
        ) : (
          <DataGrid
            hideFooter
            rows={data}
            columns={columns}
            getRowId={el => el.label}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tc('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};
