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
  onClose: (_isOpen: boolean) => void;
  refreshUsersList: () => void;
}
export const UserModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  refreshUsersList,
}) => {
  const { deleteUser } = useUserModalDelete({
    id,
    onClose,
    refreshUsersList,
  });

  return (
    <Dialog open onClose={() => onClose(false)}>
      <DialogTitle>Delete user</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure to delete user ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Close</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            deleteUser();
            onClose(false);
          }}
          autoFocus
        >
          Delete user
        </Button>
      </DialogActions>
    </Dialog>
  );
};
