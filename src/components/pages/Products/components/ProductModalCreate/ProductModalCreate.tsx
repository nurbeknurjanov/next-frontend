import * as React from 'react';
import { useProductModalCreate } from './useProductModalCreate';
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
  afterCreate: () => void;
};

export const ProductModalCreate: React.FC<IProps> = ({
  onClose,
  afterCreate,
}) => {
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tProductsPage,
    tProduct,
    createProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  } = useProductModalCreate({
    onClose,
    afterCreate,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tProductsPage('create')}</DialogTitle>
      <DialogContent>
        {createProductState.isFetching ? (
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
              label={tProduct('name')}
              error={!!errors['name']}
              helperText={errors['name']?.message as string}
              {...register('name')}
            />

            <TextField
              label={tProduct('description')}
              error={!!errors['description']}
              helperText={errors['description']?.message as string}
              {...register('description')}
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{tCommon('close')}</Button>
        <Button
          variant={'contained'}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
          disabled={!isDirty || !isValid}
          autoFocus
          loading={createProductState.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tCommon('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
