import { AppThunk } from 'store/store';
import { common } from 'store';
import { notify, auth } from 'store/common/thunks';
import { LoginRequestBodyParams, LoginResponse } from 'api/commonApi';
import { JWT } from 'shared/utils';

export const loginThunk =
  (
    body: LoginRequestBodyParams
  ): AppThunk<Promise<{ data: LoginResponse | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      common.login.thunk.request({
        body,
      })
    );

    const { error, data } = common.login.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }

    if (data) {
      const parsed = await JWT.parseToken(data);
      dispatch(auth({ isAuth: true, user: parsed.user }));
    }
    return { data, error };
  };
