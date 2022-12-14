import { createSlice } from "@reduxjs/toolkit";

const snackSlice = createSlice({
  name: "snack",
  initialState: { snackMessage: "Default message", snackOpen: false },
  reducers: {
    setSnackBar: (state, { payload: { snackMessage, snackOpen } }) => {
      state.snackMessage = snackMessage;
      state.snackOpen = snackOpen;
    },
  },
});

export const { setSnackBar } = snackSlice.actions;

export default snackSlice.reducer;

// export const selectCurrentUser = () => state.snack.user;
