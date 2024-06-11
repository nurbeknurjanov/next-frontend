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
  const { tp, tc, deleteProduct, deleteProductState } = useProductModalDelete({
    onClose,
    refreshList,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tp('delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{tc('deleteAlert')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tc('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            deleteProduct(id);
          }}
          autoFocus
          loading={deleteProductState.isFetching}
          sx={{ minWidth: 110 }}
        >
          {tc('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
