import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { id: "", token: "" },
  reducers: {
    setCredentials: (state, { payload: { id, token, username } }) => {
      state.id = id;
      state.token = token;
      state.username = username;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = () => state.auth.user;
