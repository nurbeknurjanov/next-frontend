import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './FileModalDelete';
import { deleteFileThunk } from 'store/files/thunks';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { files } from 'store';

export function useFileModalDelete({
  refreshList,
  onClose,
}: Omit<IProps, 'id'>) {
  const t = useTranslations('FilePage');
  const tc = useTranslations('Common');
  const dispatch = useAppDispatch();
  const deleteFileState = useAppSelector(files.deleteFile.selector.state);

  const deleteFile = useCallback(
    async (id: string) => {
      const { error } = await dispatch(deleteFileThunk(id));

      if (!error) {
        onClose();
        dispatch(notify(tc('successDeleted'), 'success'));
        refreshList();
      }
    },
    [onClose, refreshList, dispatch, tc]
  );

  return {
    t,
    tc,
    deleteFile,
    deleteFileState,
  };
}
