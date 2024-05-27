import * as React from 'react';
import { useProductModalDelete } from './useProductModalDelete';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface IProps {
  id: string;
  onClose: () => void;
  refreshList: () => void;
}
export const ProductModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  refreshList,
}) => {
  const { t, deleteProduct } = useProductModalDelete({
    onClose,
    refreshList,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{t('title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure to delete product ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            deleteProduct(id);
            onClose();
          }}
          autoFocus
        >
          Delete product
        </Button>
      </DialogActions>
    </Dialog>
  );
};
