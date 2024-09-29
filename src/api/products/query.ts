import { appApi, RequestParams } from 'api/base';
import {
  IProduct,
  IProductFilters,
  IProductPost,
  IProductPostUpdate,
  IProductsList,
  IProductSort,
} from './index';

const query = appApi.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<
      IProductsList,
      RequestParams<IProductFilters, IProductSort>
    >({
      query: ({ pagination, filters, sort }) => ({
        url: `products`,
        params: {
          ...pagination,
          ...(sort ? sort : {}),
          ...(filters ? filters : {}),
        },
      }),
      providesTags: result =>
        result
          ? [
              ...result.list.map(({ _id }) => ({
                type: 'Products' as const,
                id: _id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<IProduct, string>({
      query: id => ({
        url: `products/${id}`,
      }),
      providesTags: result =>
        result ? [{ type: 'Products', id: result._id }] : [],
    }),
    createProduct: builder.mutation<IProduct, IProductPost>({
      query: data => ({
        url: 'products',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<IProduct, IProductPostUpdate>({
      query: ({ id, ...data }) => {
        return {
          url: `products/${id}`,
          method: 'PUT',
          data,
        };
      },
      invalidatesTags: result =>
        result ? [{ type: 'Products', id: result._id }] : [],
    }),
    deleteProduct: builder.mutation<IProduct, string>({
      query: id => {
        return {
          url: `products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: result =>
        result ? [{ type: 'Products', id: result._id }] : [],
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} = query;
