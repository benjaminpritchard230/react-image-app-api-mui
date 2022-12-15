import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBar } from "../features/snack/snackSlice";
import { Alert } from "@mui/material";

export default function SimpleSnackbar() {
  const dispatch = useDispatch();
  const snack = useSelector((state) => state.snack);
  const open = snack.snackOpen;
  const message = snack.snackMessage;
  const severity = snack.snackSeverity;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackBar({ snackMessage: "", snackOpen: false }));
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
