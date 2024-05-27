import { RootStateType } from 'store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RequestParams } from 'api/baseApi';
import {
  FileApiConfig,
  FilesList,
  FileFilter,
  FileSort,
  FileApiError,
} from 'api/fileApi';
import { fileApi } from 'api';

import {
  MergeResponseState,
  getInitialResponseState,
  getFetchedResponseState,
  getFetchingResponseState,
} from 'store/common/types';
import axios from 'axios';
import { isEqual } from 'lodash';

export interface GetFilesStateType
  extends MergeResponseState<FilesList, FileApiError> {}

const selector = {
  state: (state: RootStateType) => state.files.getFiles,
  isFetching: (state: RootStateType) => state.files.getFiles.isFetching,
  data: (state: RootStateType) => state.files.getFiles.data,
  error: (state: RootStateType) => state.files.getFiles.error,
};

const initialState: GetFilesStateType = {
  ...getInitialResponseState(),
  error: null,
  data: null,
};

const SLICE_NAME = '@files/getFiles';

let previousQuery: RequestParams<FileFilter, FileSort>;
const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      query,
      config,
    }: {
      query: RequestParams<FileFilter, FileSort>;
      config?: FileApiConfig;
    },
    { rejectWithValue, signal }
  ) => {
    const source = axios.CancelToken.source();
    signal.addEventListener('abort', () => source.cancel());
    if (config) {
      config.cancelToken = source.token;
    }
    return fileApi.getFiles(query, config).catch(rejectWithValue);
  },
  {
    condition: (payload, { getState }) => {
      previousQuery = payload.query;
      if (!isEqual(previousQuery, payload.query)) {
        return true;
      }

      if (selector.isFetching(getState() as RootStateType)) {
        return false; //caching
      }

      return true;
    },
  }
);

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder.addCase(requestThunk.pending, state => {
      Object.assign(state, getFetchingResponseState());
    });
    builder.addCase(requestThunk.fulfilled, (state, action) => {
      Object.assign(state, getFetchedResponseState());
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(requestThunk.rejected, (state, action) => {
      Object.assign(state, initialState);
      state.error = action.payload as FileApiError;
    });
  },
});

interface GetFilesType {
  action: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getFilesObject: GetFilesType = {
  action: actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
