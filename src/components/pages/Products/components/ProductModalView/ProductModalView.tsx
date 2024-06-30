import React, { FC } from 'react';
import { useProductModel } from 'components/pages/Product';
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
import { DATE_FORMAT } from '../../../../../shared/utils';

export type IProps = {
  id: string;
  onClose: () => void;
};

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

export const ProductModalView: FC<IProps> = ({ onClose, id }) => {
  const tc = useTranslations('Common');
  const tp = useTranslations('ProductPage');
  const tm = useTranslations('Product');
  const { model, getProductState } = useProductModel({
    id,
  });

  const rows: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    rows.push({
      label: tc('id'),
      value: model._id,
    });
    rows.push({
      label: tm('name'),
      value: model.name,
    });
    rows.push({
      label: tm('description'),
      value: model.description,
    });
    rows.push({
      label: tc('createdAt'),
      value: dayjs(model.createdAt).format(DATE_FORMAT),
    });
    rows.push({
      label: tc('updatedAt'),
      value: dayjs(model.updatedAt).format(DATE_FORMAT),
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

        {getProductState.isFetching ? (
          <CircularProgress sx={{ mx: 'auto', mb: 2, display: 'block' }} />
        ) : (
          <DataGrid
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                display: 'none',
              },
            }}
            disableColumnFilter
            hideFooter
            rows={rows}
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
