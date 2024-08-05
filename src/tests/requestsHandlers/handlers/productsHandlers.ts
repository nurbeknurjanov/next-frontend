import { BASE_URL } from 'shared/utils';
import { delay, http, HttpResponse } from 'msw';
import { productMocksData } from 'tests/dataMocks';
import { IProductsList, IProduct } from 'api/productsApi';

export type Path = `${typeof BASE_URL}/${string}`;

export const productsHandlers = [
  http.get<never, null, IProductsList, Path>(
    `${BASE_URL}/products/*`,
    async () => {
      const mockData: IProduct[] = structuredClone(productMocksData);

      await delay();

      return HttpResponse.json({
        list: mockData,
        pagination: { pageNumber: 0, pageSize: 12, total: 48, pageCount: 4 },
      });
    }
  ),
];
