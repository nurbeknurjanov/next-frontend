'use client';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useCallback, useEffect } from 'react';
import { files } from 'store';
import { getFileThunk } from 'store/files/thunks';

export function useFileModel({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const getFileState = useAppSelector(files.getFile.selector.state);
  const model = getFileState.data;

  const getFile = useCallback(
    async (id: string) => {
      await dispatch(getFileThunk(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      getFile(id);
    }
  }, [id, getFile, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(files.getFile.action.reset());
    };
  }, [dispatch]);

  return {
    model,
    getFileState,
  };
}
