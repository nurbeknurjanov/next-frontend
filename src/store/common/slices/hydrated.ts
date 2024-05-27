import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';

type HydratedStateType = {
  dbConnected: boolean;
  serverWait: boolean;
  isServerStoreActual: boolean;
};
const initialState: HydratedStateType = {
  dbConnected: false,
  serverWait: false,
  isServerStoreActual: false,
};

const { actions, reducer } = createSlice({
  name: 'hydrated',
  initialState,
  reducers: {
    setServerWait: (
      state,
      action: PayloadAction<HydratedStateType['serverWait']>
    ) => {
      state.serverWait = action.payload;
      return state;
    },
    setIsServerStoreActual: (
      state,
      action: PayloadAction<HydratedStateType['isServerStoreActual']>
    ) => {
      state.isServerStoreActual = action.payload;
      return state;
    },
    setDbConnected: (
      state,
      action: PayloadAction<HydratedStateType['dbConnected']>
    ) => {
      state.dbConnected = action.payload;
      return state;
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.hydrated,
  isServerStoreActual: (state: RootStateType) =>
    state.common.hydrated.isServerStoreActual,
};

export const hydrated = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
