import { createSelector } from 'reselect';
import { RootStateType } from 'store/store';

export const getAuthState = (state: RootStateType) => state.common.auth;

export const getIsAuth = createSelector(getAuthState, data => {
  return data.isAuth;
});

export const getAuthUser = createSelector(getAuthState, data => {
  return data.user;
});
