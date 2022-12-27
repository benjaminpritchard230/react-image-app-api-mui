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
      query: (page) => `posts/all?page=${page}`,
      providesTags: ["Posts"],
    }),
    getPrivatePosts: builder.query({
      query: () => `posts/my/`,
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
    getCurrentUserInfo: builder.query({
      query: () => `user/`,
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
        url: "posts/my/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    editUserProfile: builder.mutation({
      query: (data) => ({
        url: "user/",
        method: "PATCH",
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
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}/`,
        method: "Delete",
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
    followUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}/follow/`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetPublicPostsQuery,
  useGetPrivatePostsQuery,
  useGetUserPostsQuery,
  useGetUserInfoQuery,
  useGetCurrentUserInfoQuery,
  useGetPostCommentsQuery,
  useLikeMutation,
  useMakePrivateMutation,
  useDeleteMutation,
  useLoginMutation,
  useRegisterMutation,
  useNewPostMutation,
  useEditUserProfileMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useFollowUserMutation,
} = postsApi;
