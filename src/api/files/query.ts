import { appApi, RequestParams } from 'api/base';
import { IFile, IFilePost, IFileFilters, IFilesList, IFileSort } from './types';

const query = appApi.injectEndpoints({
  endpoints: builder => ({
    getFiles: builder.query<IFilesList, RequestParams<IFileFilters, IFileSort>>(
      {
        query: ({ pagination, filters, sort }) => ({
          url: `files`,
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
                  type: 'Files' as const,
                  id: _id,
                })),
                { type: 'Files', id: 'LIST' },
              ]
            : [{ type: 'Files', id: 'LIST' }],
      }
    ),
    getFile: builder.query<IFile, string>({
      query: id => ({
        url: `files${id}`,
      }),
      providesTags: result =>
        result ? [{ type: 'Files', id: result._id }] : [],
    }),
    createFile: builder.mutation<IFile, IFilePost>({
      query: data => ({
        url: 'files',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Files', id: 'LIST' }],
    }),
    deleteFile: builder.mutation<IFile, string>({
      query: id => ({
        url: `files/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result =>
        result ? [{ type: 'Files', id: result._id }] : [],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileQuery,
  useCreateFileMutation,
  useDeleteFileMutation,
} = query;
