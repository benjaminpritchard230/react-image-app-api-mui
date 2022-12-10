import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getPublicPosts: builder.query({
      query: () => "all_posts/",
    }),
  }),
});

export const { useGetPublicPostsQuery } = postsApi;
