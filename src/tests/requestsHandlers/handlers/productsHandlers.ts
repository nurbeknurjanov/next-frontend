import { BASE_URL } from 'shared/utils';
import { delay, http, HttpResponse } from 'msw';
import { productMocksData } from 'tests/dataMocks';
import {
  IProduct,
  IProductsList,
  IProductFilters,
  IProductSort,
} from 'api/productsApi';
import { IPaginationRequest } from 'api/baseApi';

type Path = `${typeof BASE_URL}/${string}`;

export const productsHandlers = [
  http.get<
    never,
    IProductFilters & IProductSort & IPaginationRequest,
    IProductsList,
    Path
  >(`${BASE_URL}/products?pageNumber=0&pageSize=12`, async () => {
    const mockData: IProduct[] = structuredClone(productMocksData);

    //const getParams = await request.json();
    await delay();

    return HttpResponse.json({
      list: mockData,
      pagination: { pageNumber: 0, pageSize: 12, total: 6, pageCount: 1 },
    });
  }),
];
