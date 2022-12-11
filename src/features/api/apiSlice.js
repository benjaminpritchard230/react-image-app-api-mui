import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
  useGetUserPostsQuery,
  useGetUserInfoQuery,
  useLoginMutation,
} = postsApi;
