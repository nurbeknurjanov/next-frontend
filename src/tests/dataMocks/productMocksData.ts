import { IProductWithoutSystemFields } from 'api/productsApi';

const productMocksData: IProductWithoutSystemFields[] = [];
for (let i = 0; i <= 48; i++) {
  const model = { name: 'Product ' + i, description: '' };
  productMocksData.push(model);
}

export { productMocksData };
