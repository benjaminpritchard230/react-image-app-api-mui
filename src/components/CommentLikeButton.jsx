import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useLikeCommentMutation } from "../features/api/apiSlice";
import { Tooltip } from "@mui/material";
export default function CommentLikeButton({ comment }) {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;

  const [likeComment, { isLoading }] = useLikeCommentMutation();

  const liked_by =
    comment.liked_by.length > 0
      ? `Liked by ${comment.liked_by.join(", ").toString()}`
      : "No likes yet";

  const handleLikeClick = () => {
    likeComment(comment.id);
    console.log(comment);
  };
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title={liked_by} placement="right">
        {token.length > 0 ? (
          <Chip
            icon={
              comment.likes.includes(auth.id) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            label={comment.likes.length}
            variant="outlined"
            onClick={() => {
              handleLikeClick();
            }}
          />
        ) : (
          <Chip
            icon={<FavoriteBorderIcon />}
            label={comment.likes.length}
            variant="outlined"
          />
        )}
      </Tooltip>
    </Stack>
  );
}
