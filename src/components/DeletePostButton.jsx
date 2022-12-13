import * as React from "react";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useDeleteMutation } from "../features/api/apiSlice";
const DeletePostButton = ({ post }) => {
  const [deletePost, { isLoading }] = useDeleteMutation();

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
