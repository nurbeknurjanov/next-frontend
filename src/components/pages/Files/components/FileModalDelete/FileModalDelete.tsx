import React from 'react';
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
  customDeleteFile?: (_id: string) => void;
}

export const FileModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  customDeleteFile,
}) => {
  const { tFilePage, tCommon, deleteFile, isLoading } = useFileModalDelete({
    onClose,
  });

  console.log('standard file delete loading', isLoading);
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
            if (customDeleteFile) {
              customDeleteFile(id);
            }

            deleteFile(id);
          }}
          autoFocus
          loading={isLoading}
          sx={{ minWidth: 110 }}
        >
          {tCommon('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
