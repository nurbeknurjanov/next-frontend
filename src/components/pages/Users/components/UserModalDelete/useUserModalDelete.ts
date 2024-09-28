import { useAppDispatch } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './UserModalDelete';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { useDeleteUserMutation } from 'store/users/query';

export function useUserModalDelete({ onClose }: Omit<IProps, 'id'>) {
  const tCommon = useTranslations('Common');
  const tUserPage = useTranslations('UserPage');
  const dispatch = useAppDispatch();

  const [deleteModel, { isLoading }] = useDeleteUserMutation();

  const deleteUser = useCallback(
    async (id: string) => {
      const { error } = await deleteModel(id);

      if (!error) {
        onClose();
        dispatch(notify(tCommon('successDeleted'), 'success'));
      }
    },
    [onClose, deleteModel, dispatch, tCommon]
  );

  return {
    tCommon,
    tUserPage,
    deleteUser,
    isLoading,
  };
}
