import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import snackReducer from "../features/snack/snackSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    snack: snackReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
