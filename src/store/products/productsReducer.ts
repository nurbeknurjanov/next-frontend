import { combineReducers } from '@reduxjs/toolkit';
import { productsPermissions } from './slices';

export const productsReducer = combineReducers({
  productsPermissions: productsPermissions.reducer,
});
