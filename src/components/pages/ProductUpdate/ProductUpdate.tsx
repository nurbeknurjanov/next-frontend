'use client';
import React, { FC } from 'react';
import { useProductUpdate } from './useProductUpdate';
import { withCleanHooks } from 'shared/hocs';
import Loading from 'app/[locale]/loading';
import { ProductModalDelete } from '../Product';

let ProductUpdate: FC = () => {
  const { model, getProductState, showModal, setShowModal } =
    useProductUpdate();

  if (getProductState.isFetching) {
    return <Loading />;
  }

  return (
    <>
      <div>{JSON.stringify(model)}</div>
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
