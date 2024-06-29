import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';

type HydrateStateType = {
  dbConnected: boolean;
  serverWait: boolean;
};
const initialState: HydrateStateType = {
  dbConnected: false,
  serverWait: false,
};

const { actions, reducer } = createSlice({
  name: 'hydrate',
  initialState,
  reducers: {
    setServerWait: (
      state,
      action: PayloadAction<HydrateStateType['serverWait']>
    ) => {
      state.serverWait = action.payload;
      return state;
    },
    setDbConnected: (
      state,
      action: PayloadAction<HydrateStateType['dbConnected']>
    ) => {
      state.dbConnected = action.payload;
      return state;
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.hydrate,
};

export const hydrate = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
