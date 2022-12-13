import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
