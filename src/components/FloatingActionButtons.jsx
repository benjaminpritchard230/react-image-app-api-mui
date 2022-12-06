import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";

export default function FloatingActionButtons({ setNewPostDialog }) {
  const navigate = useNavigate();
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  const user = useSelector((state) => state.user);
  const token = user.token;
  const handleNewPostClick = () => {
    if (token.length > 0) {
      setNewPostDialog(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }} style={style}>
      <Tooltip title="New post">
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            handleNewPostClick();
          }}
        >
          <PostAddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
