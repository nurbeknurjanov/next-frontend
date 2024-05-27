import { combineReducers } from '@reduxjs/toolkit';
import {
  getProductsObject,
  updateProductObject,
  deleteProductObject,
  getProductObject,
  createProductObject,
} from './slices';

export const productsReducer = combineReducers({
  getProducts: getProductsObject.reducer,
  updateProduct: updateProductObject.reducer,
  deleteProduct: deleteProductObject.reducer,
  getProduct: getProductObject.reducer,
  createProduct: createProductObject.reducer,
});
