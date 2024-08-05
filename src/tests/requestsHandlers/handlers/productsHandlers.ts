//import { BASE_URL } from 'shared/utils';
import { delay, http, HttpResponse } from 'msw';
import { productMocksData } from 'tests/dataMocks';
import {
  IProduct,
  IProductsList,
  IProductFilters,
  IProductSort,
} from 'api/productsApi';
import { IPaginationRequest } from 'api/baseApi';
export const productsHandlers = [
  http.get<
    never,
    IProductFilters & IProductSort & IPaginationRequest,
    IProductsList,
    `http://localhost:3001/products/*`
  >(`http://localhost:3001/products/*`, async ({ request }) => {
    const mockData: IProduct[] = structuredClone(productMocksData);

    const getParams = await request.json();
    await delay();

    return HttpResponse.json({
      list: mockData,
      pagination: { pageNumber: 0, pageSize: 12, total: 48, pageCount: 4 },
    });
  }),
];
