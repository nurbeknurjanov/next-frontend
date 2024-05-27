import * as React from 'react';
import { useFileModal } from './useFileModal';
import {
  Box,
  LinearProgress,
  LinearProgressProps,
  TextField,
  Typography,
} from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export interface IProps {
  onClose: (_isOpen: boolean) => void;
  refreshFilesList: () => void;
}

export const FileModal: React.FC<IProps> = ({ onClose, refreshFilesList }) => {
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    submitForm,
    register,
    handleSubmit,
    errors,
    isDirty: _isDirty,
    isValid: _isValid,
    percentUploadImage,
    fieldObject,
  } = useFileModal({
    onClose,
    refreshFilesList,
  });
  const title = 'Upload file';

  const closeModal = () => onClose(false);

  return (
    <Dialog open onClose={closeModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Upload your file</DialogContentText>

        <form
          ref={el => (formRef.current = el!)}
          /*ref={formRef}*/
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(submitForm)(e);
          }}
        >
          {fieldObject ? (
            <Box sx={{ my: 2 }}>
              <img src={fieldObject.url} width={200} />
            </Box>
          ) : (
            <>
              {!!percentUploadImage && (
                <LinearProgressWithLabel
                  variant="determinate"
                  value={percentUploadImage}
                />
              )}
              <TextField
                type={'file'}
                label={'Upload file'}
                error={!!errors['fileField']}
                helperText={errors['fileField']?.message as string}
                {...register('fileField')}
              />
            </>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant={'contained'}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          disabled={!fieldObject}
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
