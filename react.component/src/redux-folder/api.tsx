import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://the-one-api.dev/v2/',
    prepareHeaders: (headers) => {
      headers.set('authorization', `Bearer TinzBFnLUdwvfCjMa4hL`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChars: builder.query({
      query: () => 'character',
    }),
  }),
});

export const { useGetCharsQuery } = myApi;