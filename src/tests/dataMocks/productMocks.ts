import { IProductWithoutSystemFields } from 'api/productsApi';

const productsData: IProductWithoutSystemFields[] = [];
for (let i = 0; i <= 48; i++) {
  const model = { name: 'Product ' + i, description: '' };
  productsData.push(model);
}

export { productsData };
