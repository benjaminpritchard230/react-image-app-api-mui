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
      providesTags: ["User"],
    }),
    getPostComments: builder.query({
      query: (id) => `posts/${id}/comments/`,
      providesTags: ["Comments"],
    }),
    like: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/like/`,
        method: "PUT",
      }),
      invalidatesTags: ["Posts"],
    }),
    makePrivate: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}/`,
        method: "PUT",
        body: { caption: post.caption, public: !post.public },
      }),
      invalidatesTags: ["Posts"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/`,
        method: "DELETE",
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
    register: builder.mutation({
      query: (credentials) => ({
        url: "register/",
        method: "POST",
        body: credentials,
      }),
    }),
    newPost: builder.mutation({
      query: (data) => ({
        url: "my_posts/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    editUserProfile: builder.mutation({
      query: (data) => ({
        url: "user/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `posts/${data.id}/comments/add/`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Posts", "Comments"],
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}/like/`,
        method: "PUT",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetPublicPostsQuery,
  useGetPrivatePostsQuery,
  useGetUserPostsQuery,
  useGetUserInfoQuery,
  useGetPostCommentsQuery,
  useLikeMutation,
  useMakePrivateMutation,
  useDeleteMutation,
  useLoginMutation,
  useRegisterMutation,
  useNewPostMutation,
  useEditUserProfileMutation,
  useAddCommentMutation,
  useLikeCommentMutation,
} = postsApi;
