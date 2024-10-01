import { combineReducers } from '@reduxjs/toolkit';
import {
  breadcrumbs,
  title,
  buttonsContent,
  hydrate,
  notify,
  auth,
  queryError,
} from './slices';

export const commonReducer = combineReducers({
  title: title.reducer,
  breadcrumbs: breadcrumbs.reducer,
  buttonsContent: buttonsContent.reducer,
  hydrate: hydrate.reducer,
  notify: notify.reducer,
  auth: auth.reducer,
  queryError: queryError.reducer,
});
