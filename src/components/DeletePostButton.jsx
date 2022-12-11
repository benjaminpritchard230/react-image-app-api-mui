import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { useDeleteMutation } from "../features/api/apiSlice";
const DeletePostButton = ({ post }) => {
  const [deletePost, { isLoading }] = useDeleteMutation();
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleDeleteClick = () => {
    deletePost(post.id);
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
