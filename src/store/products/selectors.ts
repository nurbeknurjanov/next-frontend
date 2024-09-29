import { RootStateType } from 'store/store';

export const getProductsPermissionsStateSelector = (state: RootStateType) =>
  state.products.productsPermissions;
