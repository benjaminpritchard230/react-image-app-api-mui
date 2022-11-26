import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername, updateToken } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
            {user.token}
          </Typography>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
