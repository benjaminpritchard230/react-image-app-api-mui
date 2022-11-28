import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import axios from "axios";
import ButtonAppBar from "./components/ButtonAppBar";
import PostCard from "./components/PostCard";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import PublicPosts from "./components/PublicPosts";
import ResponsiveAppBar from "./components/ButtonAppBarProfile";
import PrivatePosts from "./components/PrivatePosts";

// import { useSelector } from "react-redux";
// import { UrlContext } from "./context/UrlContext";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#0057b7",
      },
    },
  });

  const user = useSelector((state) => state.user);
  const token = user.token;
  const [postList, setPostList] = useState([]);
  const theme = "light";

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <ButtonAppBar />
        <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
          <Grid container spacing={0}>
            <Grid item xs={12}></Grid>
            <Routes>
              <Route path={"/"} element={<PublicPosts />} />
              <Route path={"/private"} element={<PrivatePosts />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
            </Routes>
          </Grid>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
