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
import UserCard from "./components/UserCard";
import FloatingActionButtons from "./components/FloatingActionButtons";
import NewPostDialog from "./components/NewPostDialog";

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
  const [publicPostList, setPublicPostList] = useState([]);
  const [privatePostList, setPrivatePostList] = useState([]);

  const theme = "light";
  const [newPostDialog, setNewPostDialog] = useState(false);

  const updatePrivatePosts = () => {
    axios
      .get("http://localhost:8000/my_posts/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setPrivatePostList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const updatePublicPosts = () => {
    axios
      .get("http://localhost:8000/all_posts/", {
        headers: {},
      })
      .then((response) => {
        console.log(response.data);
        setPublicPostList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <ButtonAppBar />
        <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
          <Grid container spacing={0}>
            <Grid item xs={12}></Grid>
            <Routes>
              <Route
                path={"/"}
                element={
                  <PublicPosts
                    publicPostList={publicPostList}
                    updatePublicPosts={updatePublicPosts}
                  />
                }
              />
              <Route
                path={"/private"}
                element={
                  <PrivatePosts
                    privatePostList={privatePostList}
                    updatePrivatePosts={updatePrivatePosts}
                  />
                }
              />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/user/:id"} element={<UserCard />} />
            </Routes>
          </Grid>
        </Box>
        <FloatingActionButtons setNewPostDialog={setNewPostDialog} />
        <NewPostDialog
          newPostDialog={newPostDialog}
          setNewPostDialog={setNewPostDialog}
          updatePrivatePosts={updatePrivatePosts}
          updatePublicPosts={updatePublicPosts}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
