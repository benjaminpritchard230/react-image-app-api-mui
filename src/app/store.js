import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { postsApi } from "../features/api/apiSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
