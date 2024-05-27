import { NotifyType } from '../slices';
import { common } from 'store';
//import { AppThunk } from 'store/store';

/*
export const notify = (
  text: NotifyType['text'], type: NotifyType['type']
): AppThunk =>
  async (dispatch) => {
    await dispatch(common.notify.actions.set({ text, type }));
  };*/
export const notify = (
  text: NotifyType['text'], type: NotifyType['type']
) =>
  common.notify.actions.set({ text, type });