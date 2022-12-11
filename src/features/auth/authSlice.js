import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { id: null, token: null },
  reducers: {
    setCredentials: (state, { payload: { id, token } }) => {
      state.id = id;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = () => state.auth.user;
