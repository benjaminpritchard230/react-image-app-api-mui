import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNewPostMutation } from "../features/api/apiSlice";
import { setSnackBar } from "../features/snack/snackSlice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEditUserProfileMutation } from "../features/api/apiSlice";
import { pickBy } from "lodash";

import MyDropzone from "./MyDropzone";
export default function EditUserProfileDialog({
  editUserProfileDialog,
  setEditUserProfileDialog,
  userInfoData,
}) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const token = auth.token;

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [editUserProfile, { isLoading }] = useEditUserProfileMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditUserProfileDialog(false);
    const data = new FormData(e.target);
    console.log(e);
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
  };
  const handleClose = () => {
    setEditUserProfileDialog(false);
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
        <form onSubmit={handleSubmit}>
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
            />

            <MyDropzone
              inputProps={{
                id: "image_url",
                label: "image",
                name: "image_url",
              }}
              accept={{
                "image/png": [".png", ".jpeg", ".jpg", ".webp"],
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                  </div>
                </section>
              )}
            </MyDropzone>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Edit profile</Button>
            <Button
              onClick={() => {
                setEditUserProfileDialog(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Task created"
        sx={{ bottom: { xs: 90, sm: 0 } }}
      />
    </>
  );
}
