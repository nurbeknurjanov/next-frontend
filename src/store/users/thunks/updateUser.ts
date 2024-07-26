import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';
import { IUserPost, IUser } from 'api/usersApi';

export const updateUserThunk =
  (id: string, body: IUserPost): AppThunk<Promise<{ data: IUser | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      users.updateUser.thunk.request({
        id,
        body,
      })
    );

    const { error, data } = users.updateUser.selector.state(getState());
    if (error) {
      if (typeof error.data === 'string') {
        dispatch(notify(error.data, 'error'));
      } else {
        if ('message' in error.data) {
          dispatch(notify(error.data.message, 'error'));
        }
      }
    }

    return { data, error };
  };
