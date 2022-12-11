import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPublicPosts: builder.query({
      query: (page) => `all_posts?page=${page}`,
    }),
    getPrivatePosts: builder.query({
      query: () => `my_posts/`,
    }),
    getUserPosts: builder.query({
      query: (id) => `user/${id}/posts/`,
    }),
    getUserInfo: builder.query({
      query: (id) => `user/${id}/`,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetPublicPostsQuery,
  useGetPrivatePostsQuery,
  useGetUserPostsQuery,
  useGetUserInfoQuery,
  useLoginMutation,
} = postsApi;
