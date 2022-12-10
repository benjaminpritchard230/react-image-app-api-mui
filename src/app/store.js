import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postsReducer from "../features/publicPosts/publicPostsSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});
