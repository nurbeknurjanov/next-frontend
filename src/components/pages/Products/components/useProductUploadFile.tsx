import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import {
  IFile,
  IFilePost,
  useDeleteFileMutation,
  useCreateFileMutation,
} from 'api/files';
import { useGetProductByIdQuery } from 'api/products';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ObjectSchema } from 'joi';
import { notify } from 'store/common/thunks';
import { useTranslations } from 'next-intl';
import { skipToken } from '@reduxjs/toolkit/query';

interface IProps {
  id?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  schema: ObjectSchema;
}
export function useProductUploadFile({ id, setValue, watch, schema }: IProps) {
  const tCommon = useTranslations('Common');
  const dispatch = useAppDispatch();

  const { data: product } = useGetProductByIdQuery(id ?? skipToken);

  const [imageObject, setImageObject] = useState<IFile | null>(null);
  const [percentUploadImage, setPercentUploadImage] = useState(0);
  useEffect(() => {
    if (product?.image) {
      setImageObject(product.image);
    }
  }, [product]);

  const [deleteFileAction] = useDeleteFileMutation();
  const deleteFile = useCallback(
    async (id: string) => {
      const { data } = await deleteFileAction(id);

      if (data) {
        if (data.data?.type === 'image') {
          setImageObject(null);
          //on product create scenario
          if (!product) {
            setValue('imageId', null);
          }
        }

        dispatch(notify(tCommon('successDeleted'), 'success'));
      }
    },
    [dispatch, setValue, tCommon, product, deleteFileAction]
  );

  const [createFileAction, { data: dataCreated }] = useCreateFileMutation();
  const uploadFile = useCallback(
    async (fileData: IFilePost) => {
      const { data } = await createFileAction(
        fileData /*, {
        onUploadProgress(progressEvent) {
          fileData?.data?.type === 'image' &&
            setPercentUploadImage(
              Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total as number)
              )
            );
        },
      }*/
      );
      setPercentUploadImage(0);

      if (data) {
        if (data.data?.type === 'image') {
          setImageObject(data);

          //on product create scenario
          if (!product) {
            setValue('imageId', data._id);
          }
        }

        dispatch(notify(tCommon('successUploaded'), 'success'));
      }
    },
    [dispatch, setValue, product, tCommon, createFileAction]
  );

  const imageFileValue = watch('imageFile');
  useEffect(() => {
    if (imageFileValue?.[0]) {
      const validated = schema.validate({ imageFile: imageFileValue });
      if (!validated.error) {
        if (id) {
          uploadFile({
            modelName: 'Product',
            modelId: id,
            data: {
              type: 'image',
            },
            fileField: imageFileValue,
          });
        } else {
          uploadFile({
            fileField: imageFileValue,
            //we must identify type for preview
            data: {
              type: 'image',
            },
          });
        }
      }
    }
  }, [dispatch, id, uploadFile, imageFileValue, schema]);

  return {
    percentUploadImage,
    imageObject,
    deleteFile,
    dataCreated,
  };
}
