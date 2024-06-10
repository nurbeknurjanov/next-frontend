import * as React from 'react';
import { useUserModalCreate } from './useUserModalCreate';
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

export const UserModalCreate: React.FC<IProps> = ({ onClose, refreshList }) => {
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tm,
    tc,
    tp,
    createUserState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  } = useUserModalCreate({
    onClose,
    refreshList,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tp('create')}</DialogTitle>
      <DialogContent>
        {createUserState.isFetching ? (
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
              helperText={errors['name']?.message as string}
              {...register('name')}
            />

            <TextField
              label={tm('email')}
              error={!!errors['email']}
              helperText={errors['email']?.message as string}
              {...register('email')}
            />

            <TextField
              label={tm('password')}
              error={!!errors['password']}
              helperText={errors['password']?.message as string}
              {...register('password')}
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
          loading={createUserState.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tc('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
