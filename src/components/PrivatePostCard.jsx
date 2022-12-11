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
import { useSelector, useDispatch } from "react-redux";
import TogglePrivateSwitch from "./TogglePrivateSwitch";
import Stack from "@mui/material/Stack";
import DeletePostButton from "./DeletePostButton";
import axios from "axios";
import { useDeleteMutation } from "../features/api/apiSlice";

export default function PrivatePostCard({ post, updatePosts }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
            <Typography variant="body2" color="text.secondary">
              {post.public ? "public" : "private"}
            </Typography>
          </CardContent>
          <CardActions>
            <Stack
              direction="row"
              justifyContent={"flex-end"}
              alignItems="center"
              spacing={1}
            >
              <DeletePostButton post={post} />
              <TogglePrivateSwitch
                post={post}
                updatePosts={updatePosts}
                key={post.id}
              />
            </Stack>
          </CardActions>
        </Card>
      </Item>
    </Grid>
  );
}
