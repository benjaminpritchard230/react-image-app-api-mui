import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { updateToken } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
export default function LikeButton({ post, token, username, handleLikeClick }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <Stack direction="row" spacing={1}>
      {token.length > 0 ? (
        <Chip
          icon={
            post.likes.includes(1) ? (
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
      <button
        onClick={() => {
          console.log(post.likers);
        }}
      >
        Test likes
      </button>
    </Stack>
  );
}
