import React, { FC } from 'react';
import { useProductModel } from 'components/pages/Product';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'shared/utils';
import Link from 'next/link';

export type IProps = {
  id: string;
  onClose: () => void;
};

export const ProductModalView: FC<IProps> = ({ onClose, id }) => {
  const { tCommon, tProduct, tProductPage, model, getProductState } =
    useProductModel({
      id,
    });

  const columns: GridColDef[] = [
    {
      field: 'label',
      headerName: 'Label',
      flex: 1,
    },
    {
      field: 'value',
      headerName: 'Value',
      flex: 2,
      renderCell: params => {
        return params.value;
      },
    },
  ];

  const rows: { label: string; value: string | React.ReactNode }[] = [];
  if (model) {
    rows.push({
      label: tCommon('id'),
      value: model._id,
    });
    rows.push({
      label: tProduct('name'),
      value: model.name,
    });
    rows.push({
      label: tProduct('description'),
      value: model.description,
    });
    rows.push({
      label: tCommon('createdAt'),
      value: dayjs(model.createdAt).format(DATE_FORMAT),
    });
    rows.push({
      label: tCommon('updatedAt'),
      value: dayjs(model.updatedAt).format(DATE_FORMAT),
    });

    if (model.image) {
      /*rows.push({
        label: 'image',
        value: model.image.url,
      });*/
    }
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tProductPage('view')}</DialogTitle>
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
            columnHeaderHeight={0}
            getRowHeight={params => {
              if (params.id === 'image') return 'auto';
            }}
            /*
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                display: 'none',
              },
            }}
            slots={{
              columnHeaders: forwardRef<HTMLDivElement>((props, ref) => (
                <div ref={ref}>&nbsp;</div>
              )),
            }}*/
            disableColumnFilter
            hideFooter
            rows={rows}
            columns={columns}
            getRowId={el => el.label}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};
