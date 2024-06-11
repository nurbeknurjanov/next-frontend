import { useAppDispatch, useAppSelector } from 'store/hooks';
import { files } from 'store';
import { useTranslations } from 'next-intl';
import { IFilePost } from 'api/filesApi';
import { IProps } from './FileModalCreate';
import { usePrepareForm } from '../usePrepareForm';
import { notify } from 'store/common/thunks';
import { createFileThunk } from 'store/files/thunks';

export function useFileModalCreate({ onClose, refreshList }: IProps) {
  const dispatch = useAppDispatch();
  const tc = useTranslations('Common');
  const tps = useTranslations('FilesPage');
  const tm = useTranslations('File');

  const createFileState = useAppSelector(files.createFile.selector.state);

  const { register, errors, isValid, isDirty, handleSubmit } = usePrepareForm(
    {}
  );

  const createFile = async (formData: IFilePost) => {
    const { data } = await dispatch(createFileThunk(formData));

    if (data) {
      dispatch(notify(tc('successCreated'), 'success'));
      refreshList();
      onClose();
    }
  };

  const submitForm = createFile;

  return {
    tm,
    tc,
    tps,
    createFileState,
    register,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    submitForm,
  };
}
