import { combineReducers } from '@reduxjs/toolkit';
import { counter } from './counter';
import { commonReducer } from './common/commonReducer';
import { productsReducer } from './products/productsReducer';
import { appApi } from 'api/base';

export const rootReducer = combineReducers({
  counter: counter.reducer,
  common: commonReducer,
  products: productsReducer,
  [appApi.reducerPath]: appApi.reducer,
});
