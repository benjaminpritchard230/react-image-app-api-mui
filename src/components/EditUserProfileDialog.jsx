import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../features/snack/snackSlice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEditUserProfileMutation } from "../features/api/apiSlice";

export default function EditUserProfileDialog({
  editUserProfileDialog,
  setEditUserProfileDialog,
}) {
  const dispatch = useDispatch();

  const [location, setLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const [editUserProfile] = useEditUserProfileMutation();

  const handleEditClick = async () => {
    setEditUserProfileDialog(false);
    const data = new FormData();
    if (location.length > 0) {
      data.append("location", location);
    }
    if (aboutMe.length > 0) {
      data.append("about_me", aboutMe);
    }
    try {
      await editUserProfile(data).unwrap();
      dispatch(
        setSnackBar({
          snackMessage: "Profile edited",
          snackOpen: true,
          snackSeverity: "success",
        })
      );
    } catch (err) {
      console.log(err, "err");
      dispatch(
        setSnackBar({
          snackMessage: "Unable to edit profile.",
          snackOpen: true,
          snackSeverity: "error",
        })
      );
    }
    setLocation("");
    setAboutMe("");
  };
  const handleClose = () => {
    setEditUserProfileDialog(false);
    setLocation("");
    setAboutMe("");
  };
  return (
    <>
      <Dialog
        open={editUserProfileDialog}
        PaperProps={{
          sx: {
            width: {
              lg: "100vw",
              xl: "33vw",
            },
          },
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit your user profile</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {" "}
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            name="location"
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <TextField
            name="about_me"
            autoFocus
            margin="dense"
            id="about_me"
            label="About me"
            type="text"
            fullWidth
            variant="standard"
            value={aboutMe}
            onChange={(e) => {
              setAboutMe(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditClick()}>Edit profile</Button>
          <Button
            onClick={() => {
              setEditUserProfileDialog(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
