import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import PostAddIcon from "@mui/icons-material/PostAdd";
export default function FloatingActionButtons({ setNewPostDialog }) {
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  //   const token = useSelector((state) => state.token.value);

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} style={style}>
      <Tooltip title="New post">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setNewPostDialog(true);
          }}
        >
          <PostAddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
