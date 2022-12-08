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

  const [publicPostCount, setPublicPostCount] = useState(0);

  const theme = "light";
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [page, setPage] = useState(1);

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

  const updatePublicPosts = () => {
    axios
      .get(`http://localhost:8000/all_posts?page=${page}`, {
        headers: {},
      })
      .then((response) => {
        console.log(page);

        console.log(response.data);
        setPublicPostList(response.data.results);
        setPublicPostCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const updatePosts = () => {
    updatePublicPosts();
    updatePrivatePosts();
  };

  useEffect(() => {
    updatePublicPosts();
  }, [page]);

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
                    updatePosts={updatePosts}
                  />
                }
              />
              <Route
                path={"/private"}
                element={
                  <PrivatePosts
                    privatePostList={privatePostList}
                    updatePosts={updatePosts}
                  />
                }
              />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/user/:id"} element={<UserCard />} />
            </Routes>
          </Grid>
          <PaginationButtons
            publicPostCount={publicPostCount}
            page={page}
            setPage={setPage}
            updatePublicPosts={updatePublicPosts}
          />
        </Box>
        <FloatingActionButtons setNewPostDialog={setNewPostDialog} />
        <NewPostDialog
          newPostDialog={newPostDialog}
          setNewPostDialog={setNewPostDialog}
          updatePosts={updatePosts}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
