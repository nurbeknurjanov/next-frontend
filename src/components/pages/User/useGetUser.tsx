import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect, useRef } from 'react';
import { users } from 'store';
import { AppThunk } from 'store/store';
import { useNotify, useHydrateState } from 'shared/hooks';

interface IProps {
  id: string;
}
export function useGetUser({ id }: IProps) {
  const isServerStoreActual = useRef<boolean>();
  isServerStoreActual.current = useHydrateState();
  const dispatch = useAppDispatch();
  const notify = useNotify();

  const userState = useAppSelector(users.getUser.selector.state);

  const model = userState.data;

  const getUserThunk = useCallback(
    (id: string): AppThunk =>
      async (dispatch, getState) => {
        await dispatch(users.getUser.thunk.request({ id }));
        const { error } = users.getUser.selector.state(getState());
        if (error) {
          notify(error.data, 'error');
        }
      },
    [notify]
  );

  const getUser = useCallback(
    (id: string) => dispatch(getUserThunk(id)),
    [dispatch, getUserThunk]
  );

  useEffect(() => {
    if (isServerStoreActual.current) return;

    if (id) {
      getUser(id);
    }
  }, [dispatch, getUser, id]);

  useEffect(
    () => () => {
      if (isServerStoreActual.current) return;

      dispatch(users.getUser.action.reset());
    },
    [dispatch]
  );

  return {
    model,
  };
}
