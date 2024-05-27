import * as React from 'react';
import { useFileModalDelete } from './useFileModalDelete';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface IProps {
  id: string;
  onClose: (_isOpen: boolean) => void; //todo
  refreshFilesList: () => void;
}
export const FileModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  refreshFilesList,
}) => {
  const { deleteFile } = useFileModalDelete({
    id,
    onClose,
    refreshFilesList,
  });

  return (
    <Dialog open onClose={() => onClose(false)}>
      <DialogTitle>Delete file</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure to delete file ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Close</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            deleteFile();
            onClose(false);
          }}
          autoFocus
        >
          Delete file
        </Button>
      </DialogActions>
    </Dialog>
  );
};
