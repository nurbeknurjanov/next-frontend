import * as React from 'react';
import { useUserModal } from './useUserModal';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';

export interface IProps {
  id?: string;
  type: 'create' | 'update';
  onClose: (_isOpen: boolean) => void;
  refreshUsersList: () => void;
}

export const UserModal: React.FC<IProps> = ({
  id,
  type,
  onClose,
  refreshUsersList,
}) => {
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const { submitForm, register, handleSubmit, errors, isDirty, isValid } =
    useUserModal({
      id,
      type,
      onClose,
      refreshUsersList,
    });
  const title = type === 'create' ? 'Create user' : 'Update user';

  const closeModal = () => onClose(false);

  return (
    <Dialog open onClose={closeModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/*<DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>*/}

        {/*<input ref={el => (this.inputElement = el)} />*/}

        <form
          ref={el => (formRef.current = el!)}
          /*ref={formRef}*/
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(submitForm)(e);
          }}
        >
          <TextField
            label={'User name'}
            error={!!errors['name']}
            helperText={errors['name']?.message as string}
            {...register('name')}
          />

          <TextField
            label={'Email'}
            error={!!errors['email']}
            helperText={errors['email']?.message as string}
            {...register('email')}
          />

          {!id && (
            <TextField
              type={'password'}
              label={'Password'}
              error={!!errors['password']}
              helperText={errors['password']?.message as string}
              {...register('password')}
            />
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            formRef.current?.requestSubmit();
            //closeModal();
          }}
          disabled={!isDirty && !isValid}
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
