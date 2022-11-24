import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import axios from "axios";
import ButtonAppBar from "./components/ButtonAppBar";
import PostCard from "./components/PostCard";

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

  const token = "9c7fb538e128868c75cb66d7087fd98f6524864d";
  const postsUrl = "http://localhost:8000/all_posts/";
  const [postList, setPostList] = useState([]);
  const theme = "light";

  const urlList = {};

  const updatePosts = () => {
    if (token.length > 0) {
      axios
        .get(postsUrl, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setPostList(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      setPostList([]);
    }
  };

  useEffect(() => {
    updatePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // useEffect(() => {
  //   const filtered = taskList.filter((task) => {
  //     return task.name.toLowerCase().includes(filterText.toLowerCase());
  //   });
  //   setFilteredTaskList(filtered);
  // }, [filterText, taskList]);

  const displayImagePosts = () => {
    if (token.length > 0) {
      return postList.map((post) => (
        <PostCard post={post} updatePosts={updatePosts} key={post.id} />
      ));
    }
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minWidth: 1 }} key="1">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ButtonAppBar />
          </Grid>

          {displayImagePosts()}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
