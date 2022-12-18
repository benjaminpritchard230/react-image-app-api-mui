import { createSlice } from "@reduxjs/toolkit";

const snackSlice = createSlice({
  name: "snack",
  initialState: {
    snackMessage: "Default message",
    snackOpen: false,
    snackSeverity: "info",
  },
  reducers: {
    setSnackBar: (
      state,
      { payload: { snackMessage, snackOpen, snackSeverity } }
    ) => {
      state.snackMessage = snackMessage;
      state.snackSeverity = snackSeverity;
      state.snackOpen = snackOpen;
    },
  },
});

export const { setSnackBar } = snackSlice.actions;

export default snackSlice.reducer;

// export const selectCurrentUser = () => state.snack.user;
