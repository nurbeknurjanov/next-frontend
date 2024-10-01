import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './FileModalDelete';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { useDeleteFileMutation } from 'api/files';

export function useFileModalDelete({ onClose }: Omit<IProps, 'id'>) {
  const tFilePage = useTranslations('FilePage');
  const tCommon = useTranslations('Common');
  const dispatch = useAppDispatch();

  const [deleteModel, { isLoading }] = useDeleteFileMutation();

  const deleteFile = useCallback(
    async (id: string) => {
      const { error } = await deleteModel(id);

      if (!error) {
        onClose();
        dispatch(notify(tCommon('successDeleted'), 'success'));
      }
    },
    [onClose, dispatch, tCommon, deleteModel]
  );

  return {
    tFilePage,
    tCommon,
    deleteFile,
    isLoading,
  };
}
