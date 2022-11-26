import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/user/userSlice";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Image App
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.username}
          </Typography>
          <Button color="inherit">Login</Button>
          <Button
            onClick={() => {
              dispatch(update("hprit"));
            }}
            color="inherit"
          >
            Hprit
          </Button>
          <Button
            onClick={() => {
              dispatch(update(""));
            }}
            color="inherit"
          >
            clear
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
