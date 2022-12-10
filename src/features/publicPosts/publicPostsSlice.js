import { createSlice } from "@reduxjs/toolkit";

export const publicPostsSlice = createSlice({
  name: "publicPosts",
  initialState: {
    posts: [],
  },
  reducers: {
    refreshPublicPosts: (state, action) => {
      return action.payload.posts;
    },
  },
});

// Action creators are generated for each case reducer function
export const { refreshPublicPosts } = publicPostsSlice.actions;

export default publicPostsSlice.reducer;
