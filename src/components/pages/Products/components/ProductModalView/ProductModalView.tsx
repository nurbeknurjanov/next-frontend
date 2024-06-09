import React, { FC } from 'react';
import { useProductModalView } from '../useProductModalView';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslations } from 'next-intl';

export type IProps = {
  id: string;
  onClose: () => void;
};

export const ProductModalView: FC<IProps> = ({ onClose, id }) => {
  const tc = useTranslations('Common');
  const tp = useTranslations('ProductPage');
  const { model, getProductState } = useProductModalView({
    id,
  });

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
          <div>{JSON.stringify(model)}</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tc('close')}</Button>
      </DialogActions>
    </Dialog>
  );
};
