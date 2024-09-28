import { combineReducers } from '@reduxjs/toolkit';
import {
  breadcrumbs,
  title,
  buttonsContent,
  login,
  hydrate,
  notify,
  auth,
  getAccessToken,
  queryError,
} from './slices';

export const commonReducer = combineReducers({
  title: title.reducer,
  breadcrumbs: breadcrumbs.reducer,
  buttonsContent: buttonsContent.reducer,
  login: login.reducer,
  hydrate: hydrate.reducer,
  notify: notify.reducer,
  auth: auth.reducer,
  getAccessToken: getAccessToken.reducer,
  queryError: queryError.reducer,
});
