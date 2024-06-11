import { AppThunk } from 'store/store';
import { files } from 'store';
import { notify } from 'store/common/thunks';
import { IFileApiError } from 'api/filesApi';

export const deleteFileThunk =
  (id: string): AppThunk<Promise<{ error: IFileApiError | null }>> =>
  async (dispatch, getState) => {
    await dispatch(
      files.deleteFile.thunk.request({
        id,
      })
    );

    const { error } = files.deleteFile.selector.state(getState());
    if (error) {
      dispatch(notify(error.data, 'error'));
    }

    return {
      error,
    };
  };
