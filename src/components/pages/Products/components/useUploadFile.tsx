import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products } from 'store';
import { deleteFileThunk, createFileThunk } from 'store/files/thunks';
import { IFile, IFilePost } from 'api/filesApi';
import { UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';

interface IProps {
  id?: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
}
export function useUploadFile({ id, setValue, watch, errors }: IProps) {
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

  const imageFileValue = watch('imageFile');
  const imageFileValueError = errors['imageFile'];
  useEffect(() => {
    if (!imageFileValueError && !!imageFileValue?.[0]) {
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
          data: {
            type: 'image',
          },
        });
      }
    }
  }, [imageFileValue, imageFileValueError, dispatch, id, uploadFile]);

  return {
    percentUploadImage,
    imageObject,
    deleteFile,
  };
}
