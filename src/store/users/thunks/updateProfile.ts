import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';
import { IUserPost, IUser } from 'api/usersApi';

export const updateProfileThunk =
  (body: IUserPost): AppThunk<Promise<{ data: IUser | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      users.updateProfile.thunk.request({
        body,
      })
    );

    const { error, data } = users.updateProfile.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }

    return { data, error };
  };
