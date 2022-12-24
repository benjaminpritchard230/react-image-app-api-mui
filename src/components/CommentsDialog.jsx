import * as React from "react";
import { useGetPostCommentsQuery } from "../features/api/apiSlice";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CommentAdd from "./CommentAdd";
import { useRef, useEffect } from "react";
import CommentsList from "./CommentsList";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function CommentsDialog({
  post,
  commentsDialog,
  setCommentsDialog,
}) {
  const handleClose = () => setCommentsDialog(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const { data: postCommentsData } = useGetPostCommentsQuery(post.id);
  if (commentsDialog === true) {
    console.log(postCommentsData, "comments");
  }

  return (
    <Dialog
      open={commentsDialog}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Comments</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {post.comments.length > 0 ? (
          <CommentsList post={post} />
        ) : (
          "Be the first to comment!"
        )}
      </DialogContent>

      <DialogActions>
        <CommentAdd post={post} handleClose={handleClose} />
      </DialogActions>
    </Dialog>
  );
}
