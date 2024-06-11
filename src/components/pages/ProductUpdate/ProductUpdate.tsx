'use client';
import React, { FC, useRef } from 'react';
import { useProductUpdate } from './useProductUpdate';
import { withCleanHooks } from 'shared/hocs';
import Loading from 'app/[locale]/loading';
import { ProductModalDelete } from '../Product';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';

let ProductUpdate: FC = () => {
  const formRef = useRef<HTMLFormElement>();
  const {
    tc,
    tm,
    updateProductState,
    getProductState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
    showModal,
    setShowModal,
  } = useProductUpdate();

  if (getProductState.isFetching) {
    return <Loading />;
  }

  return (
    <>
      <div>
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

            <Button
              variant={'contained'}
              onClick={() => {
                formRef.current?.requestSubmit();
              }}
              disabled={!isDirty || !isValid}
              autoFocus
              loading={updateProductState.isFetching}
              sx={{ minWidth: 120 }}
            >
              {tc('update')}
            </Button>
          </form>
        )}
      </div>
      {showModal?.type === 'delete' && (
        <ProductModalDelete
          id={showModal.id}
          onClose={() => setShowModal(null)}
        />
      )}
    </>
  );
};

ProductUpdate = withCleanHooks(ProductUpdate);

export { ProductUpdate };
