import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useContext } from "react";
import { Snackbar } from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
export default function NewPostDialog({
  newPostDialog,
  setNewPostDialog,
  updatePrivatePosts,
  updatePublicPosts,
}) {
  const user = useSelector((state) => state.user);

  const token = user.token;

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewPostDialog(false);
    // let caption = e.target[0].value;
    // let image_url = e.target[1].files[0];
    const data = new FormData(e.target);
    axios
      .post(
        `http://localhost:8000/my_posts/`,
        { caption: data.get("caption"), image_url: data.get("image_url") },
        {
          headers: {
            Authorization: `token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log(data.get("image_url"));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        updatePrivatePosts();
        updatePublicPosts();
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={newPostDialog}>
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
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input
                      {...getInputProps({
                        id: "image_url",
                        label: "image",
                        name: "image_url",
                      })}
                    />
                    <p>Drop an image here or click to select an image</p>
                  </div>
                </section>
              )}
            </Dropzone>
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
        ;
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Task created"
        sx={{ bottom: { xs: 90, sm: 0 } }}
      />
    </div>
  );
}
