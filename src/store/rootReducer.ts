import { combineReducers } from '@reduxjs/toolkit';
import { counter } from './counter';
import { commonReducer } from './common/commonReducer';
import { usersReducer } from './users/usersReducer';
import { productsReducer } from './products/productsReducer';
import { filesReducer } from './files/filesReducer';

export const rootReducer = combineReducers({
  counter: counter.reducer,
  common: commonReducer,
  users: usersReducer,
  products: productsReducer,
  files: filesReducer,
});
