import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import Link from "@mui/material/Link";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import LikeButton from "./LikeButton";
import { useSelector, useDispatch } from "react-redux";
import PostCommentsToggle from "./PostCommentsToggle";
import { useState } from "react";
import CommentsDialog from "./CommentsDialog";
import ReactTimeAgo from "react-time-ago";
import CardMedia from "@mui/material/CardMedia";
import DeletePostButton from "./DeletePostButton";
import TogglePrivateSwitch from "./TogglePrivateSwitch";
export default function PostCard({ post, isPrivate }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const dispatch = useDispatch();
  const [commentsDialog, setCommentsDialog] = useState(false);
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const userUrl = `user/${post.user}/`;
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

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
          <CardMedia
            component="img"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              "{capitalizeString(post.caption)}" posted by{" "}
              <Link component={RouterLink} to={`/${userUrl}`} variant="body2">
                {capitalizeString(post.author)}
              </Link>{" "}
              <ReactTimeAgo date={Date.parse(post.created_on)} />
            </Typography>
          </CardContent>
          <CardActions>
            {isPrivate ? (
              <>
                <LikeButton post={post} token={""} username={auth.username} />
                <PostCommentsToggle
                  post={post}
                  token={""}
                  username={auth.username}
                  commentsDialog={commentsDialog}
                  setCommentsDialog={setCommentsDialog}
                />
                <DeletePostButton post={post} />
                <TogglePrivateSwitch post={post} key={post.id} />
              </>
            ) : (
              <>
                <LikeButton
                  post={post}
                  token={token}
                  username={auth.username}
                />
                <PostCommentsToggle
                  post={post}
                  token={token}
                  username={auth.username}
                  commentsDialog={commentsDialog}
                  setCommentsDialog={setCommentsDialog}
                />
              </>
            )}
          </CardActions>
        </Card>
      </Item>
      <CommentsDialog
        key={post.id}
        post={post}
        commentsDialog={commentsDialog}
        setCommentsDialog={setCommentsDialog}
      />
    </Grid>
  );
}
