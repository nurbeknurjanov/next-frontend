import * as React from 'react';
import { useFileModalCreate } from './useFileModalCreate';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export type IProps = {
  onClose: () => void;
  refreshList: () => void;
};

export const FileModalCreate: React.FC<IProps> = ({ onClose, refreshList }) => {
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tm,
    tc,
    tps,
    createFileState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  } = useFileModalCreate({
    onClose,
    refreshList,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tps('create')}</DialogTitle>
      <DialogContent>
        {createFileState.isFetching ? (
          <CircularProgress sx={{ mx: 'auto', mb: 2, display: 'block' }} />
        ) : (
          <form
            ref={el => (formRef.current = el!)}
            /*ref={formRef}*/
            onSubmit={e => {
              e.preventDefault();
              handleSubmit(submitForm)(e);
            }}
          >
            <TextField
              label={tm('name')}
              error={!!errors['name']}
              helperText={errors['name']?.message}
              {...register('name')}
            />

            <TextField
              label={tm('description')}
              error={!!errors['description']}
              helperText={errors['description']?.message}
              {...register('description')}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tc('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          disabled={!isDirty || !isValid}
          autoFocus
          loading={createFileState.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tc('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
