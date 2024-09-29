import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';
import type { ResponseApiError } from 'api/baseApi';
import { endpoints } from 'api/usersQuery';

type StateType = {
  error: ResponseApiError<{ message: string }> | null;
};
const initialState: StateType = {
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'queryError',
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    set: (state, action: PayloadAction<StateType>) => {
      state.error = action.payload.error;
      return state;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(
        endpoints.getUsers.matchRejected,
        endpoints.getUserById.matchRejected,
        endpoints.createUser.matchRejected,
        endpoints.updateUser.matchRejected,
        endpoints.deleteUser.matchRejected
      ),
      (state, action) => {
        state.error = action.payload as ResponseApiError<{ message: string }>;
        /*Object.assign(state, {
          error: action.payload as ResponseApiError<{ message: string }>,
        });*/
      }
    );
  },
});

const selector = {
  state: (state: RootStateType) => state.common.queryError,
};

export const queryError = {
  actions,
  reducer,
  selector,
} as {
  actions: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
};
