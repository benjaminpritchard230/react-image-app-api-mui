import { Divider, Avatar, Grid, Paper } from "@mui/material";
import CommentLikeButton from "./CommentLikeButton";
import ReactTimeAgo from "react-time-ago";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import DeleteCommentButton from "./DeleteCommentButton";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function CommentDisplay({ comment }) {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const id = auth.id;
  console.log(comment);
  console.log(id);

  const userUrl = `user/${comment.user}/`;
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <Paper elevation={0} style={{ padding: "15px 10px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Link component={RouterLink} to={`/${userUrl}`} variant="body2">
            {capitalizeString(comment.author)}
          </Link>{" "}
          <p style={{ textAlign: "left" }}>{comment.body} </p>
          <p style={{ textAlign: "left", color: "gray" }}>
            <ReactTimeAgo date={Date.parse(comment.created_on)} />
          </p>
          <Stack direction="row" spacing={1}>
            <CommentLikeButton comment={comment} key={comment.id} />
            {comment.user === id ? (
              <DeleteCommentButton comment={comment} />
            ) : null}
          </Stack>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </Paper>
  );
}
