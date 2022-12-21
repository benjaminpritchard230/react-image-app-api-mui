import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BurstModeOutlinedIcon from "@mui/icons-material/BurstModeOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { toggleTheme } from "../features/theme/themeSlice";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.theme.theme);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    dispatch(setCredentials({ id: "", token: "" }));
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BurstModeOutlinedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Image
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              disableScrollLock={true}
            >
              <MenuItem key={"ertyer "} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <BurstModeOutlinedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".4rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Image
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {theme === "dark" ? (
              <Tooltip title="Light mode" placement="bottom">
                <IconButton
                  onClick={() => {
                    dispatch(toggleTheme());
                  }}
                >
                  <Brightness7Icon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Dark mode" placement="bottom">
                <IconButton
                  onClick={() => {
                    dispatch(toggleTheme());
                  }}
                >
                  <Brightness4Icon />
                </IconButton>
              </Tooltip>
            )}
            <Button
              key={"fgsdfg"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {token.length > 0 ? (
                  <Avatar
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    alt="user-avatar"
                  />
                ) : (
                  <Avatar />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              disableScrollLock={true}
            >
              {token.length > 0
                ? [
                    <MenuItem
                      key={"sftgvdbdfjghd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/private");
                      }}
                    >
                      <Typography textAlign="center">My profile</Typography>
                    </MenuItem>,
                    <MenuItem
                      key={"sftbdfjghd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        handleLogoutClick();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key={"dvfghvbd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/login");
                      }}
                    >
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>,
                    <MenuItem
                      key={"fgbhgfbd"}
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/register");
                      }}
                    >
                      <Typography textAlign="center">Register</Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
