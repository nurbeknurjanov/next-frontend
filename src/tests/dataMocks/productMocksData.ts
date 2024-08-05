import { IProduct } from 'api/productsApi';

const productMocksData: IProduct[] = [];
/*for (let i = 0; i <= 5; i++) {

}*/
const model: IProduct = {
  name: 'Product1',
  description: '',
  createdAt: '2024-07-10T14:43:16.937Z',
  updatedAt: '2024-07-11T14:39:27.695Z',
  _id: '668e9e0421affca8c52beb4',
};
productMocksData.push(model);
export { productMocksData };
