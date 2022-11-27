import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "bprit",
    token: "test123",
  },
  reducers: {
    updateUsername: (state, param) => {
      const { payload } = param;
      state.username = payload;
    },
    updateToken: (state, param) => {
      const { payload } = param;
      state.token = payload;
    },
    clearUser: (state, param) => {
      const { payload } = param;
      state.username = payload;
      state.token = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUsername, updateToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
