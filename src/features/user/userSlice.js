import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    token: "",
    id: null,
  },
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateId: (state, action) => {
      state.id = action.payload;
    },
    clearUser: (state, action) => {
      state.username = action.payload;
      state.token = action.payload;
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUsername, updateToken, updateId, clearUser } =
  userSlice.actions;

export default userSlice.reducer;
