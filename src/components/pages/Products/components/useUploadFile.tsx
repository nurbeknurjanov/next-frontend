import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { products, files } from 'store';
import { AppThunk } from 'store/store';
import { IFile, IFilePost } from 'api/filesApi';
import { UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';

interface IProps {
  id: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
}
export function useUploadFile({ id, setValue, watch, errors }: IProps) {
  const dispatch = useAppDispatch();

  const product = useAppSelector(products.getProduct.selector.data);
  const [imageObject, setImageObject] = useState<IFile | null>(null);

  const deleteFileThunk =
    (id: string): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(files.deleteFile.thunk.request({ id }));
      const { error, data } = files.deleteFile.selector.state(getState());
      if (error) {
        return alert('error' + error.data);
      }

      if (data) {
        if (data.data.type === 'image') {
          setImageObject(null);
        }

        //on product create scenario
        if (!product) {
          setValue(data.data.type, null);
        }
      }
    };
  const deleteFile = (id: string) => dispatch(deleteFileThunk(id));

  useEffect(() => {
    if (product) {
      setImageObject(product.image);
    }
  }, [product]);

  const [percentUploadImage, setPercentUploadImage] = useState(0);

  const uploadFileThunk = useCallback(
    (fileData: IFilePost): AppThunk =>
      async (dispatch, getState) => {
        await dispatch(
          files.createFile.thunk.request({
            body: fileData,
            config: {
              onUploadProgress(progressEvent) {
                if (fileData?.data?.type === 'image') {
                  setPercentUploadImage(
                    Math.round(
                      (progressEvent.loaded * 100) /
                        (progressEvent.total as number)
                    )
                  );
                }
              },
            },
          })
        );
        setPercentUploadImage(0);

        const { error, data } = files.createFile.selector.state(getState());

        if (error) {
          return alert('error' + error.data);
        }

        if (data) {
          alert('File successfully uploaded');
          if (data.data.type === 'image') {
            setImageObject(data);
          }

          if (data.data.type) {
            setValue(data.data.type, data._id);
          }
        }
      },
    [setValue]
  );

  const imageFileValue = watch('imageFile');
  const imageFileValueError = errors['imageFile'];
  useEffect(() => {
    if (!imageFileValueError && !!imageFileValue?.[0]) {
      if (id) {
        dispatch(
          uploadFileThunk({
            model: 'Product',
            modelId: id,
            data: {
              type: 'image',
            },
            fileField: imageFileValue,
          })
        );
      } else {
        dispatch(
          uploadFileThunk({
            fileField: imageFileValue,
          })
        );
      }
    }
  }, [imageFileValue, imageFileValueError, dispatch, id, uploadFileThunk]);

  return {
    percentUploadImage,
    imageObject,
    deleteFile,
  };
}
