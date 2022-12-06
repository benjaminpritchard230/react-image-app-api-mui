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

import {
  updateUsername,
  updateToken,
  clearUser,
} from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.token;
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(clearUser(""));
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Image App
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.username}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.id}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.token}
          </Typography>
          {token.length > 0 ? (
            <>
              <Button
                onClick={() => {
                  navigate("/private");
                }}
                color="inherit"
              >
                Private
              </Button>
              <Button
                onClick={() => {
                  handleLogoutClick();
                }}
                color="inherit"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                color="inherit"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                color="inherit"
              >
                Register
              </Button>
            </>
          )}
          <Avatar alt={user.username} src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
