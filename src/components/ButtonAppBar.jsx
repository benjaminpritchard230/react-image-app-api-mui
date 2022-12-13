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
import { useLocation } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import PrivatePostsButton from "./PrivatePostsButton";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const handleLogoutClick = () => {
    dispatch(setCredentials({ id: "", token: "" }));
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
            {auth.username}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {auth.id}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {auth.token}
          </Typography>

          {token.length > 0 ? (
            <>
              <PrivatePostsButton />
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
          <Avatar alt={auth.username} src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
