'use client';
import React, { FC, useRef } from 'react';
import { useProductUpdate } from './useProductUpdate';
import { withCleanHooks } from 'shared/hocs';
import Loading from 'app/[locale]/loading';
import { ProductModalDelete } from '../Products';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import { Button } from 'shared/ui';
import { useSetPageData } from '../../../shared/hooks';
import { useTranslations } from 'next-intl';

let ProductUpdate: FC = () => {
  const formRef = useRef<HTMLFormElement>();
  const {
    id,
    tCommon,
    tProduct,
    tProductPage,
    tProductsPage,
    router,
    model,
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

  const title = tProductPage('update');
  useSetPageData(title, [
    {
      label: tProductsPage('update'),
      href: '/products',
    },
    {
      label: model!?.name,
      href: `/products/${id}`,
    },
    title,
  ]);

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

            <Button
              variant={'outlined'}
              sx={{ mr: 1 }}
              onClick={() => {
                if (document.referrer) {
                  return router.back();
                }
                router.push(`/products/${model?._id}`);
              }}
            >
              {tCommon('back')}
            </Button>
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
              {tCommon('update')}
            </Button>
          </form>
        )}
      </div>
      {showModal?.type === 'delete' && (
        <ProductModalDelete
          id={showModal.id}
          onClose={() => setShowModal(null)}
          afterDelete={() => router.push('/products')}
        />
      )}
    </>
  );
};

ProductUpdate = withCleanHooks(ProductUpdate);

export { ProductUpdate };
