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
  refreshList: () => void;
}
export const FileModalDelete: React.FC<IProps> = ({
  id,
  onClose,
  refreshList,
}) => {
  const { t, tc, deleteFile, deleteFileState } = useFileModalDelete({
    onClose,
    refreshList,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{t('delete')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{tc('deleteAlert')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tc('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            deleteFile(id);
          }}
          autoFocus
          loading={deleteFileState.isFetching}
          sx={{ minWidth: 110 }}
        >
          {tc('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
