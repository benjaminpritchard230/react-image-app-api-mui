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
  tagTypes: ["Posts", "Auth"],
  endpoints: (builder) => ({
    getPublicPosts: builder.query({
      query: (page) => `all_posts?page=${page}`,
      providesTags: ["Posts"],
    }),
    getPrivatePosts: builder.query({
      query: () => `my_posts/`,
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.query({
      query: (id) => `user/${id}/posts/`,
      providesTags: ["Posts"],
    }),
    getUserInfo: builder.query({
      query: (id) => `user/${id}/`,
    }),
    like: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/like/`,
        method: "PUT",
      }),
      invalidatesTags: ["Posts"],
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
  useLikeMutation,
  useLoginMutation,
} = postsApi;
