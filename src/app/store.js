import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import publicPostsReducer from "../features/publicPosts/publicPostsSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    publicPosts: publicPostsReducer,
  },
});
