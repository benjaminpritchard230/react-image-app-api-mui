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
import PaginationButtons from "./components/PaginationButtons";
import { useLocation } from "react-router-dom";
import UserPosts from "./components/UserPosts";
import { useGetPublicPostsQuery } from "./features/api/apiSlice";
import { useLoginMutation } from "./features/api/apiSlice";
import { setCredentials } from "./features/auth/authSlice";

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.auth);

  const [login, { data, isLoading }] = useLoginMutation();

  const token = user.token;
  const [publicPostList, setPublicPostList] = useState([]);
  const [privatePostList, setPrivatePostList] = useState([]);

  const [publicPostCount, setPublicPostCount] = useState(0);

  const theme = "light";
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState(1);

  const updatePrivatePosts = () => {
    if (token.length > 0) {
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
    }
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />

      <button
        onClick={() => {
          login({ username: "bprit", password: "benben11" });
          if (!isLoading) {
            dispatch(setCredentials(data));
          }
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          console.log(currentUser, "currentuser");
        }}
      >
        print user
      </button>
      <Router>
        <ButtonAppBar />
        <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
          <Grid container spacing={0}>
            <Grid item xs={12}></Grid>
            <Routes>
              <Route
                path={"/"}
                element={
                  <>
                    <PublicPosts publicPostList={publicPostList} page={page} />
                    <PaginationButtons page={page} setPage={setPage} />
                  </>
                }
              />
              <Route
                path={"/private"}
                element={<PrivatePosts privatePostList={privatePostList} />}
              />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route
                path={"/user/:id"}
                element={
                  <>
                    <UserCard setUserId={setUserId} />
                    <UserPosts />
                  </>
                }
              />
            </Routes>
          </Grid>
        </Box>
        <FloatingActionButtons setNewPostDialog={setNewPostDialog} />
        <NewPostDialog
          newPostDialog={newPostDialog}
          setNewPostDialog={setNewPostDialog}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
