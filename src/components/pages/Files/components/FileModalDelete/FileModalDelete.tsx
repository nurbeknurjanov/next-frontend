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
  onClose: () => void;
  afterDelete: () => void;
}
export const FileModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  afterDelete,
}) => {
  const { tFilePage, tCommon, deleteFile, deleteFileState } =
    useFileModalDelete({
      onClose,
      afterDelete,
    });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tFilePage('delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{tCommon('deleteAlert')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            deleteFile(id);
          }}
          autoFocus
          loading={deleteFileState.isFetching}
          sx={{ minWidth: 110 }}
        >
          {tCommon('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
