import * as React from 'react';
import { useProductModalUpdate } from './useProductModalUpdate';
import { TextField } from '@mui/material';
import { Button, LinearProgressWithLabel } from 'shared/ui';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type IProps = {
  id: string;
  onClose: () => void;
  afterUpdate: () => void;
};

export const ProductModalUpdate: React.FC<IProps> = ({
  onClose,
  afterUpdate,
  id,
}) => {
  //const id = type === 'update' ? props.id : null;
  const formRef = useRef<HTMLFormElement>();
  //const formRef = useRef<HTMLFormElement>(null); //for direct assign
  const {
    tCommon,
    tProductPage,
    tProduct,
    aggStates,
    getProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    percentUploadImage,
    imageObject,
    deleteFile,
  } = useProductModalUpdate({
    id: id!,
    onClose,
    afterUpdate,
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{tProductPage('update')}</DialogTitle>
      <DialogContent>
        {getProductState.isFetching ? (
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

            {imageObject ? (
              <Box sx={{ my: 2 }}>
                <img src={imageObject.url} width={200} />
                <DeleteIcon
                  color={'error'}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => deleteFile(imageObject._id!)}
                />
              </Box>
            ) : (
              <>
                <TextField
                  type={'file'}
                  label={'Image file'}
                  error={!!errors['imageFile']}
                  helperText={
                    errors['imageFile']?.message ?? (
                      <LinearProgressWithLabel
                        variant="determinate"
                        value={percentUploadImage}
                      />
                    )
                  }
                  {...register('imageFile')}
                />
              </>
            )}
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
          loading={aggStates.isFetching}
          sx={{ minWidth: 120 }}
        >
          {tCommon('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
