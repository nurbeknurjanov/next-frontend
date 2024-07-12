import { AppThunk } from 'store/store';
import { common } from 'store';
import { notify } from 'store/common/thunks';
import { LoginRequestBodyParams, LoginResponse } from 'api/commonApi';

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

    return { data, error };
  };
