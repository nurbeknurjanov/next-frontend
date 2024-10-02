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
  customDeleteFileLoading?: boolean;
}

export const FileModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  customDeleteFile,
  customDeleteFileLoading,
}) => {
  const { tFilePage, tCommon, deleteFile, isLoading } = useFileModalDelete({
    onClose,
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
            if (customDeleteFile) {
              customDeleteFile(id);
            }

            deleteFile(id);
          }}
          autoFocus
          loading={isLoading || customDeleteFileLoading}
          sx={{ minWidth: 110 }}
        >
          {tCommon('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
