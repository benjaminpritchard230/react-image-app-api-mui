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

export default function NewPostDialog({
  newPostDialog,
  setNewPostDialog,
  updatePrivatePosts,
  updatePublicPosts,
}) {
  const user = useSelector((state) => state.user);

  const token = user.token;

  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setNewPostDialog(false);
    let caption = e.target[0].value;
    axios
      .post(
        `http://localhost:8000/my_posts/`,
        { caption: caption },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
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
          <DialogTitle>Enter task name</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="caption"
              label="Caption"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setNewPostDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Create task</Button>
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
    </div>
  );
}
