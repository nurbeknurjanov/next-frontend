import { BASE_URL } from 'shared/utils';
import { delay, http, HttpResponse } from 'msw';
import { productMocksData } from 'tests/dataMocks';
import {
  IProduct,
  IProductsList,
  IProductFilters,
  IProductSort,
  IProductPost,
} from 'api/productsApi';
import { IPaginationRequest } from 'api/baseApi';

type Path = `${typeof BASE_URL}/${string}`;

export const productsHandlers = [
  http.get<
    never,
    IProductFilters & IProductSort & IPaginationRequest,
    IProductsList,
    Path
  >(`${BASE_URL}/products*`, async ({ request }) => {
    let mockData: IProduct[] = productMocksData;
    //let mockData: IProduct[] = structuredClone(productMocksData);

    const url = new URL(request.url);
    if (url.searchParams.get('name')) {
      mockData = mockData.filter(el =>
        el.name.includes(url.searchParams.get('name') as string)
      );
    }

    await delay();

    return HttpResponse.json({
      list: mockData,
      pagination: { pageNumber: 0, pageSize: 12, total: 6, pageCount: 1 },
    });
  }),

  http.post<never, IProductPost, IProduct, Path>(
    `${BASE_URL}/products`,
    async ({ request }) => {
      const body = await request.json();
      await delay();
      const newMock: IProduct = {
        ...productMocksData[0],
        ...body,
        _id: productMocksData.length + '68e9e0421affca8c52beb4',
      } as IProduct;
      productMocksData.push(newMock);
      return HttpResponse.json(newMock);
    }
  ),

  http.put<{ id: string }, IProductPost, IProduct, Path>(
    `${BASE_URL}/products/:id`,
    async ({ request, params }) => {
      const element = productMocksData.find(el => el._id === params.id);
      const body = await request.json();

      console.log('body', body);
      Object.entries(body).map(([key, value]) => {
        //@ts-ignore
        element[key] = value;
      });
      await delay();
      return HttpResponse.json(element);
    }
  ),
];
