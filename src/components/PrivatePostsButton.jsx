import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
const PrivatePostsButton = () => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  const location = useLocation();
  const navigate = useNavigate();
  const button = () => {};
  return (
    <>
      {location.pathname === "/private" ? (
        <Button
          onClick={() => {
            navigate("/");
          }}
          color="inherit"
        >
          All posts
        </Button>
      ) : (
        <Button
          onClick={() => {
            navigate("/private");
          }}
          color="inherit"
        >
          Private posts
        </Button>
      )}
    </>
  );
};

export default PrivatePostsButton;
