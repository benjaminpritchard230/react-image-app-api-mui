import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useLikeCommentMutation } from "../features/api/apiSlice";
export default function CommentLikeButton({ comment }) {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;

  const [likeComment, { isLoading }] = useLikeCommentMutation();

  const handleLikeClick = () => {
    likeComment(comment.id);
  };
  return (
    <Stack direction="row" spacing={1}>
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
    </Stack>
  );
}
