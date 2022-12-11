import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector, useDispatch } from "react-redux";
export default function LikeButton({ post, token, handleLikeClick }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  return (
    <Stack direction="row" spacing={1}>
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
    </Stack>
  );
}
