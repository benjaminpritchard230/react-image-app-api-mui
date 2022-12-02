import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import Link from "@mui/material/Link";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import LikeButton from "./LikeButton";
import { useSelector, useDispatch } from "react-redux";

export default function PostCard({
  post,
  updatePublicPosts,
  updatePrivatePosts,
}) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user.token;
  const userUrl = `user/${post.user}/`;
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleLikeClick = () => {
    axios
      .put(
        `http://localhost:8000/posts/${post.id}/like/`,
        {},
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        updatePublicPosts();
        updatePrivatePosts();
      });
  };

  // console.log(post.likes);
  return (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        default: {
          duration: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
        },
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
      key={post.id}
    >
      <Item sx={{ m: 0.5 }}>
        <Card sx={{ minHeight: 150 }}>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography variant="body2" color="text.secondary">
              {post.caption}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Posted by{" "}
              <Link component={RouterLink} to={userUrl} variant="body2">
                {post.author}
              </Link>{" "}
              at {post.created_on}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <PostCardButtons post={post} handleLikeClick={handleLikeClick} /> */}
            <LikeButton
              post={post}
              handleLikeClick={handleLikeClick}
              token={token}
              username={user.username}
            />
          </CardActions>
        </Card>
      </Item>
    </Grid>
  );
}
