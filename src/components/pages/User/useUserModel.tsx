'use client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { users } from 'store';
import { getUserThunk } from 'store/users/thunks';
import { useHydrateState } from 'shared/hooks';

export function useUserModel({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const getUserState = useAppSelector(users.getUser.selector.state);
  const model = getUserState.data;

  const getUser = useCallback(
    async (id: string) => {
      await dispatch(getUserThunk(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id, getUser, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(users.getUser.action.reset());
    };
  }, [dispatch]);

  return {
    model,
    getUserState,
  };
}
