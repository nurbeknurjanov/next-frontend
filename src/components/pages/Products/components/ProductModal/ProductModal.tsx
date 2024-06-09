import * as React from 'react';
import { useProductModal } from './useProductModal';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export type ModalType =
  | { type: 'create' }
  | { type: 'update' | 'delete'; id: string };

export type IProps = ModalType & {
  onClose: () => void;
  refreshList: () => void;
};

export const ProductModal: React.FC<IProps> = ({
  onClose,
  refreshList,
  ...props
}) => {
  const type = props.type;
  const id = type === 'update' ? props.id : null;
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tm,
    tc,
    aggStates,
    getProductState,
    title,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  } = useProductModal({
    id: id!,
    type,
    onClose,
    refreshList,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/*<DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>*/}

        {/*<input ref={el => (this.inputElement = el)} />*/}

        {type === 'update' && getProductState.isFetching ? (
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
              label={tm('description')}
              error={!!errors['description']}
              helperText={errors['description']?.message as string}
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
          loading={aggStates.isFetching}
          sx={{ minWidth: 120 }}
        >
          {type === 'create' ? tc('create') : tc('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
