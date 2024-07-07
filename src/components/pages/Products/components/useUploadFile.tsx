import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { deleteFileThunk, createFileThunk } from 'store/files/thunks';
import { IFile, IFilePost } from 'api/filesApi';
import {
  UseFormSetValue,
  UseFormWatch,
  UseFormGetFieldState,
} from 'react-hook-form';

interface IProps {
  id?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  getFieldState: UseFormGetFieldState<any>;
}
export function useUploadFile({ id, setValue, watch, getFieldState }: IProps) {
  const dispatch = useAppDispatch();

  const product = useAppSelector(products.getProduct.selector.data);
  const [imageObject, setImageObject] = useState<IFile | null>(null);
  const [percentUploadImage, setPercentUploadImage] = useState(0);
  useEffect(() => {
    if (product) {
      setImageObject(product.image);
    }
  }, [product]);

  const deleteFile = async (id: string) => {
    const { data } = await dispatch(deleteFileThunk(id));

    if (data?.data?.type === 'image') {
      setImageObject(null);
      //on product create scenario
      if (!product) {
        setValue('image', null);
      }
    }
  };

  const uploadFile = useCallback(
    async (fileData: IFilePost) => {
      const { data } = await dispatch(
        createFileThunk(fileData, {
          onUploadProgress(progressEvent) {
            fileData?.data?.type === 'image' &&
              setPercentUploadImage(
                Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total as number)
                )
              );
          },
        })
      );
      setPercentUploadImage(0);

      if (data?.data?.type === 'image') {
        setImageObject(data);

        //on product create scenario
        if (!product) {
          setValue('image', data._id);
        }
      }
    },
    [dispatch, setValue, product]
  );

  const imageFileFieldState = getFieldState('imageFile');
  const imageFileValue = watch('imageFile');
  useEffect(() => {
    if (
      imageFileFieldState.isTouched &&
      imageFileFieldState.isDirty &&
      !imageFileFieldState.invalid &&
      imageFileValue?.[0]
    ) {
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
  }, [imageFileValue, dispatch, id, uploadFile, imageFileFieldState]);

  return {
    percentUploadImage,
    imageObject,
    deleteFile,
  };
}
