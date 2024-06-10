import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useTranslations } from 'next-intl';
import { IProps } from './UserModalDelete';
import { deleteUserThunk } from 'store/users/thunks';
import { notify } from 'store/common/thunks';
import { useCallback } from 'react';
import { users } from 'store';

export function useUserModalDelete({
  refreshList,
  onClose,
}: Omit<IProps, 'id'>) {
  const t = useTranslations('UserPage');
  const tc = useTranslations('Common');
  const dispatch = useAppDispatch();
  const deleteUserState = useAppSelector(users.deleteUser.selector.state);

  const deleteUser = useCallback(
    async (id: string) => {
      const { error } = await dispatch(deleteUserThunk(id));

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
    deleteUser,
    deleteUserState,
  };
}
