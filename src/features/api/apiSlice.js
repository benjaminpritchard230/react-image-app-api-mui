import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  endpoints: (builder) => ({
    getPublicPosts: builder.query({
      query: (page) => `all_posts?page=${page}`,
    }),
    getUserPosts: builder.query({
      query: (id) => `user/${id}/posts/`,
    }),
    getUserInfo: builder.query({
      query: (id) => `user/${id}/`,
    }),
  }),
});

export const {
  useGetPublicPostsQuery,
  useGetUserPostsQuery,
  useGetUserInfoQuery,
} = postsApi;
