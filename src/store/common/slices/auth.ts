import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';
import type { IUser } from 'api/usersApi';

export type AuthStateType = {
  isAuth: boolean;
  user: IUser | null;
};
const initialState: AuthStateType = {
  isAuth: false,
  user: null,
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<AuthStateType>) => {
      state = action.payload;
      return state;
    },
  },
});

const selector = {
  state: (state: RootStateType) => state.common.auth,
  isAuth: (state: RootStateType) => state.common.auth.isAuth,
  user: (state: RootStateType) => state.common.auth.user,
};

export const auth = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
