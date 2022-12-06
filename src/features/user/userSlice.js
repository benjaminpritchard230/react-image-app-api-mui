import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    token: "",
    id: null,
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
    updateId: (state, param) => {
      const { payload } = param;
      state.id = payload;
    },
    clearUser: (state, param) => {
      const { payload } = param;
      state.username = payload;
      state.token = payload;
      state.id = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUsername, updateToken, updateId, clearUser } =
  userSlice.actions;

export default userSlice.reducer;
