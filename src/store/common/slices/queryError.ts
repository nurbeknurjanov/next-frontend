import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootStateType } from 'store/store';
import type { ResponseApiError } from 'api/base';
//import { endpoints } from 'api/usersQuery';

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
    builder.addCase('api/executeMutation/rejected', (state, action) => {
      const rtkQueryAction = action as unknown as {
        payload: PayloadAction<ResponseApiError<{ message: string }>>;
      };
      Object.assign(state, {
        error: rtkQueryAction.payload,
      });
    });
    builder.addCase('api/executeQuery/rejected', (state, action) => {
      const rtkQueryAction = action as unknown as {
        payload: PayloadAction<ResponseApiError<{ message: string }>>;
      };
      Object.assign(state, {
        error: rtkQueryAction.payload,
      });
      //state.error = rtkQueryAction.payload;
    });
    /*builder.addMatcher(
      isAnyOf(endpoints.updateProfile.matchRejected),
      (state, action) => {
        state.error = action.payload as ResponseApiError<{ message: string }>;
      }
    );*/
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
