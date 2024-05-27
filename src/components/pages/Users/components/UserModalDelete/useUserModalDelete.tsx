import { useAppDispatch } from 'store/hooks';
import { users } from 'store';
import { AppThunk } from 'store/store';
import { useNotify } from 'shared/hooks';
import { IProps } from './UserModalDelete';

export function useUserModalDelete({ id, refreshUsersList, onClose }: IProps) {
  const dispatch = useAppDispatch();
  const notify = useNotify();

  const deleteUserThunk = (): AppThunk => async (dispatch, getState) => {
    await dispatch(
      users.deleteUser.thunk.request({
        id,
      })
    );
    const { error } = users.deleteUser.selector.state(getState());

    if (error) {
      return notify(error.data, 'error');
    }

    notify('Successfully deleted user', 'success');
    refreshUsersList();
    onClose(false);
  };
  const deleteUser = () => dispatch(deleteUserThunk());

  return {
    deleteUser,
  };
}
