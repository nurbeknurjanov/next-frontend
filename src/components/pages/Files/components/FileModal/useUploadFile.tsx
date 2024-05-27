import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { files } from 'store';
import { AppThunk } from 'store/store';
import { IFile, IFilePost } from 'api/fileApi';
import { useNotify } from 'shared/hooks';
import { UseFormWatch, FieldErrors } from 'react-hook-form';

interface IProps {
  watch: UseFormWatch<any>;
  errors: FieldErrors;
}
export function useUploadFile({ watch, errors }: IProps) {
  const dispatch = useAppDispatch();
  const notify = useNotify();

  const [fieldObject, setFieldObject] = useState<IFile | null>(null);

  const [percentUploadImage, setPercentUploadImage] = useState(0);

  const uploadFileThunk = useCallback(
    (fileData: IFilePost): AppThunk =>
      async (dispatch, getState) => {
        await dispatch(
          files.createFile.thunk.request({
            body: fileData,
            config: {
              onUploadProgress: function (progressEvent) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total as number)
                );
                setPercentUploadImage(percentCompleted);
              },
            },
          })
        );
        setPercentUploadImage(0);
        const { error, data } = files.createFile.selector.state(getState());

        if (error) {
          return notify(error.data, 'error');
        }

        if (data) {
          notify('File successfully uploaded', 'success');

          setFieldObject(data);
        }
      },
    [notify]
  );

  const fileField = watch('fileField');
  const fileFieldError = errors['fileField'];
  useEffect(() => {
    if (!fileFieldError && !!fileField?.[0]) {
      dispatch(
        uploadFileThunk({
          model: '0',
          fileField: fileField,
        })
      );
    }
  }, [fileField, fileFieldError, dispatch, uploadFileThunk]);

  return {
    percentUploadImage,
    fieldObject,
  };
}
