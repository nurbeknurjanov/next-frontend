import { IFilePost } from 'api/fileApi';
import { IProps } from './FileModal';
import { usePrepareForm } from './usePrepareForm';
import { useUploadFile } from './useUploadFile';

export function useFileModal({ onClose, refreshFilesList }: IProps) {
  const { watch, register, handleSubmit, errors, isValid, isDirty } =
    usePrepareForm();

  const { percentUploadImage, fieldObject } = useUploadFile({ watch, errors });

  /*const createFileThunk =
    (formData: IFilePost): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(
        files.createFile.thunk.request({
          body: formData,
        })
      );
      const { error } = files.createFile.selector.state(getState());

      if (error) {
        return notify(error.data, 'error');
      }

      notify('Successfully create new file', 'success');
      refreshFilesList();
      onClose(false);
    };
*/
  const submitForm = (_data: IFilePost) => {
    //dispatch(createFileThunk(data));
    refreshFilesList();
    onClose(false);
  };

  return {
    watch,
    submitForm,
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    percentUploadImage,
    fieldObject,
  };
}
