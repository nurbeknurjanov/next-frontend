import { AppThunk } from 'store/store';
import { common } from 'store';
import { notify, auth } from 'store/common/thunks';
import { CommonApiConfig } from 'api/commonApi';
import { JWT } from 'shared/utils';

export const getAccessTokenThunk =
  (config: CommonApiConfig): AppThunk<Promise<{ data: string | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      common.getAccessToken.thunk.request({
        config,
      })
    );

    const { error, data } = common.getAccessToken.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }

    if (data) {
      const accessTokenParsed = await JWT.parseToken(data);
      dispatch(auth({ isAuth: true, user: accessTokenParsed.user }));
    }

    return { data, error };
  };
