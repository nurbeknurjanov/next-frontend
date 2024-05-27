import { combineReducers } from '@reduxjs/toolkit';
import {
  breadcrumbs,
  title,
  pageTopContentButtons,
  login,
  hydrated,
  notify,
} from './slices';

export const commonReducer = combineReducers({
  title: title.reducer,
  breadcrumbs: breadcrumbs.reducer,
  buttons: pageTopContentButtons.reducer,
  login: login.reducer,
  hydrated: hydrated.reducer,
  notify: notify.reducer,
});
