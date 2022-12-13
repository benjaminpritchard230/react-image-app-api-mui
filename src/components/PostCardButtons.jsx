import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const PostCardButtons = ({ handleLikeClick }) => {
  return (
    <Stack
      direction="row"
      justifyContent={"flex-end"}
      alignItems="center"
      spacing={1}
    >
      <Tooltip title="Done" placement="top">
        <IconButton
          onClick={() => {
            handleLikeClick();
          }}
        >
          <Avatar>
            <FavoriteBorderIcon />
          </Avatar>
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default PostCardButtons;
