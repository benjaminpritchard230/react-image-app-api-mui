import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { postsApi } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
