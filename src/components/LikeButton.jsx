import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useLikeMutation } from "../features/api/apiSlice";
import { Tooltip } from "@mui/material";
export default function LikeButton({ post, token }) {
  const auth = useSelector((state) => state.auth);

  const [like, { isLoading }] = useLikeMutation();

  const liked_by =
    post.liked_by.length > 0
      ? `Liked by ${post.liked_by.join(", ").toString()}`
      : "No likes yet";

  const handleLikeClick = () => {
    like(post.id);
  };
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title={liked_by} placement="top">
        {token.length > 0 ? (
          <Chip
            icon={
              post.likes.includes(auth.id) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            label={post.likes.length}
            variant="outlined"
            onClick={() => {
              handleLikeClick();
            }}
          />
        ) : (
          <Chip
            icon={<FavoriteBorderIcon />}
            label={post.likes.length}
            variant="outlined"
          />
        )}
      </Tooltip>
    </Stack>
  );
}
