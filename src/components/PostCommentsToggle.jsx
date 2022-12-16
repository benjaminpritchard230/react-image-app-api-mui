import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { useSelector } from "react-redux";
import { useLikeMutation } from "../features/api/apiSlice";
export default function PostCommentsToggle({
  post,
  token,
  commentsDialog,
  setCommentsDialog,
}) {
  const auth = useSelector((state) => state.auth);

  const [like, { isLoading }] = useLikeMutation();

  const handleClick = () => {
    setCommentsDialog(!commentsDialog);
  };
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={<ModeCommentOutlinedIcon color="info" />}
        label={post.comments.length}
        variant="outlined"
        onClick={() => {
          handleClick();
        }}
      />
    </Stack>
  );
}
