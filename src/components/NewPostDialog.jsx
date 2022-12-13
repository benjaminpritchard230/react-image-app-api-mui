import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNewPostMutation } from "../features/api/apiSlice";
import MyDropzone from "./MyDropzone";
export default function NewPostDialog({ newPostDialog, setNewPostDialog }) {
  const auth = useSelector((state) => state.auth);

  const token = auth.token;

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [newPost, { isLoading }] = useNewPostMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewPostDialog(false);
    const data = new FormData(e.target);
    data.append("public", true);
    console.log(data, "data");
    newPost(data);
  };
  const handleClose = () => {
    setOpen(false);
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
            {/* <input type="file" id="image_url" label="Image" name="image_url" /> */}
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
