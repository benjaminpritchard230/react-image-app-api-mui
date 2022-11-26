import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "bprit",
  },
  reducers: {
    update: (state, param) => {
      const { payload } = param;
      state.username = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = userSlice.actions;

export default userSlice.reducer;
