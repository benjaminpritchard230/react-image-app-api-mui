import { Divider, Avatar, Grid, Paper } from "@mui/material";
import CommentLikeButton from "./CommentLikeButton";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function CommentDisplay({ comment }) {
  return (
    <Paper elevation={0} style={{ padding: "15px 10px" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="Remy Sharp" src={imgLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{comment.author}</h4>
          <p style={{ textAlign: "left" }}>{comment.body} </p>
          <p style={{ textAlign: "left", color: "gray" }}>
            <ReactTimeAgo date={Date.parse(comment.created_on)} />
          </p>
          <CommentLikeButton comment={comment} key={comment.id} />
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
    </Paper>
  );
}
