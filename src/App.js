import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import PublicPosts from "./components/PublicPosts";
import PrivatePosts from "./components/PrivatePosts";
import UserCard from "./components/UserCard";
import FloatingActionButtons from "./components/FloatingActionButtons";
import NewPostDialog from "./components/NewPostDialog";
import PaginationButtons from "./components/PaginationButtons";
import UserPosts from "./components/UserPosts";
import { useSelector } from "react-redux";
import SimpleSnackbar from "./components/SimpleSnackbar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import PrivateUserCard from "./components/PrivateUserCard";
import PublicPostsTopCard from "./components/PublicPostsTopCard";
import FollowingPosts from "./components/FollowingPosts";
import PublicPostsBottomCard from "./components/PublicPostsBottomCard";

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
  const theme = useSelector((state) => state.theme.theme);
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [followingPosts, setFollowingPosts] = useState(false);

  const auth = useSelector((state) => state.auth);
  const token = auth.token;

  const displayPosts = () => {
    if (!followingPosts) {
      return (
        <>
          <PublicPosts
            page={page}
            followingPosts={followingPosts}
            setFollowingPosts={setFollowingPosts}
            key={Math.random()}
          />
        </>
      );
    } else {
      return <FollowingPosts />;
    }
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <ResponsiveAppBar />
        <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
          <Grid container spacing={0}>
            <Grid item xs={12}></Grid>
            <Routes>
              <Route
                path={"/"}
                element={
                  <>
                    {token.length > 0 ? (
                      <PublicPostsTopCard
                        followingPosts={followingPosts}
                        setFollowingPosts={setFollowingPosts}
                        page={page}
                        setPage={setPage}
                      />
                    ) : null}

                    {displayPosts()}
                    {!followingPosts ? (
                      <PublicPostsBottomCard page={page} setPage={setPage} />
                    ) : null}
                  </>
                }
              />
              <Route
                path={"/private"}
                element={
                  token.length > 0 ? (
                    <>
                      <PrivateUserCard />
                      <PrivatePosts />
                    </>
                  ) : (
                    "Login to view user profile."
                  )
                }
              />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route
                path={"/user/:id"}
                element={
                  <>
                    <UserCard />
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
        <SimpleSnackbar />
      </Router>
    </ThemeProvider>
  );
}

export default App;
