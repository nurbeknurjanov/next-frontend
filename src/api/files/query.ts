import { appApi, RequestParams } from 'api/base';
import { IFile, IFilePost, IFileFilters, IFilesList, IFileSort } from './types';
import { omit } from 'lodash';

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
      query: body => {
        const formData = new FormData();
        for (const key in omit(body, 'fileField')) {
          if (key === 'data') {
            formData.append(key, JSON.stringify(body[key]));
          } else {
            const value = body[key as keyof IFilePost];
            formData.append(key, value as string);
          }
        }
        formData.append('fileField', body.fileField[0]);

        return {
          url: 'files/upload',
          method: 'POST',
          data: formData,
        };
      },
      invalidatesTags: [
        { type: 'Files', id: 'LIST' },
        { type: 'Products', id: 'LIST' },
      ],
    }),
    deleteFile: builder.mutation<IFile, string>({
      query: id => ({
        url: `files/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result =>
        result
          ? [
              { type: 'Files', id: result._id },
              { type: 'Products', id: result.modelId },
            ]
          : [],
    }),
  }),
});

export const {
  useGetFilesQuery,
  useGetFileQuery,
  useCreateFileMutation,
  useDeleteFileMutation,
} = query;
