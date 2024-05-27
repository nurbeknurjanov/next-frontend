import { useAppDispatch } from 'store/hooks';
import { files } from 'store';
import { AppThunk } from 'store/store';
import { useNotify } from 'shared/hooks';
import { IProps } from './FileModalDelete';

export function useFileModalDelete({ id, refreshFilesList, onClose }: IProps) {
  const dispatch = useAppDispatch();
  const notify = useNotify();

  const deleteFileThunk = (): AppThunk => async (dispatch, getState) => {
    await dispatch(
      files.deleteFile.thunk.request({
        id,
      })
    );
    const { error } = files.deleteFile.selector.state(getState());

    if (error) {
      return notify(error.data, 'error');
    }

    notify('Successfully deleted file', 'success');
    refreshFilesList();
    onClose(false);
  };
  const deleteFile = () => dispatch(deleteFileThunk());

  return {
    deleteFile,
  };
}
