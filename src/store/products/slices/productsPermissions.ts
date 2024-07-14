import { RootStateType } from 'store/store';
import { createSlice } from '@reduxjs/toolkit';

export interface ProductsPermissionsStateType {
  canViewProducts: boolean;
  canViewProduct: boolean;
  canCreateProduct: boolean;
  canUpdateProduct: boolean;
  canDeleteProduct: boolean;
}

const selector = {
  state: (state: RootStateType) => state.products.productsPermissions,
};

const initialState: ProductsPermissionsStateType = {
  canViewProducts: true,
  canViewProduct: true,
  canCreateProduct: false,
  canUpdateProduct: false,
  canDeleteProduct: false,
};

const SLICE_NAME = '@products/productsPermissions';
const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset(_state) {
      return initialState;
    },
  },
});

interface ProductsPermissionsType {
  action: typeof actions;
  reducer: typeof reducer;
  selector: typeof selector;
}

export const productsPermissions: ProductsPermissionsType = {
  action: actions,
  reducer,
  selector,
};
