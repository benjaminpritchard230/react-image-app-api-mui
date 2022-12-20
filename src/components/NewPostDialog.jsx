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

import MyDropzone from "./MyDropzone";
export default function NewPostDialog({ newPostDialog, setNewPostDialog }) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const token = auth.token;

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [newPost, { isLoading }] = useNewPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewPostDialog(false);
    const data = new FormData(e.target);
    data.append("public", true);
    console.log(data, "data");
    try {
      await newPost(data).unwrap();
      dispatch(
        setSnackBar({
          snackMessage: "New post created",
          snackOpen: true,
          snackSeverity: "success",
        })
      );
    } catch (err) {
      console.log(err, "err");
      dispatch(
        setSnackBar({
          snackMessage: "Unable to create new post.",
          snackOpen: true,
          snackSeverity: "error",
        })
      );
    }
  };
  const handleClose = () => {
    setNewPostDialog(false);
  };
  return (
    <>
      <Dialog
        open={newPostDialog}
        PaperProps={{
          sx: {
            width: {
              lg: "100vw",
              xl: "33vw",
            },
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create a new post</DialogTitle>
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
              name="caption"
              autoFocus
              margin="dense"
              id="caption"
              label="Caption"
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
            <Button type="submit">Create post</Button>
            <Button
              onClick={() => {
                setNewPostDialog(false);
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
