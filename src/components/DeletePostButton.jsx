import * as React from "react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { setSnackBar } from "../features/snack/snackSlice";
import { useDeleteMutation } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
const DeletePostButton = ({ post }) => {
  const dispatch = useDispatch();
  const [deletePost, { isLoading }] = useDeleteMutation();
  const handleDeleteClick = async () => {
    try {
      await deletePost(post.id).unwrap();
      dispatch(
        setSnackBar({
          snackMessage: "Post deleted.",
          snackOpen: true,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setSnackBar({
          snackMessage: "That post does not exist.",
          snackOpen: true,
        })
      );
    }
  };
  return (
    <Tooltip title="Delete" placement="top">
      <IconButton
        onClick={() => {
          handleDeleteClick();
        }}
      >
        <Avatar>
          <DeleteIcon sx={{ "&:hover": { color: "red" } }} />
        </Avatar>
      </IconButton>
    </Tooltip>
  );
};

export default DeletePostButton;
