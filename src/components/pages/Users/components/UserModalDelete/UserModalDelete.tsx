import * as React from 'react';
import { useUserModalDelete } from './useUserModalDelete';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface IProps {
  id: string;
  onClose: () => void;
  afterDelete: () => void;
}
export const UserModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  afterDelete,
}) => {
  const { tp, tc, deleteUser, deleteUserState } = useUserModalDelete({
    onClose,
    afterDelete,
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
            deleteUser(id);
          }}
          autoFocus
          loading={deleteUserState.isFetching}
          sx={{ minWidth: 110 }}
        >
          {tc('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
