import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGetPostCommentsQuery } from "../features/api/apiSlice";
import CommentDisplay from "./CommentDisplay";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CommentAdd from "./CommentAdd";
import { useRef, useEffect } from "react";
import CommentsList from "./CommentsList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CommentsDialog({
  post,
  commentsDialog,
  setCommentsDialog,
}) {
  const handleOpen = () => setCommentsDialog(true);
  const handleClose = () => setCommentsDialog(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const {
    data: postCommentsData,
    error,
    isError,
    isLoading,
  } = useGetPostCommentsQuery(post.id);
  if (commentsDialog === true) {
    console.log(postCommentsData, "comments");
  }

  const displayComments = () => {
    if (!isLoading) {
      return postCommentsData.map((comment) => (
        <CommentDisplay comment={comment} key={comment.id} />
      ));
    }
  };

  return (
    <div>
      <Dialog
        open={commentsDialog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}
          {post.comments.length > 0 ? (
            <CommentsList post={post} />
          ) : (
            "Be the first to comment!"
          )}
        </DialogContent>

        <DialogActions>
          <CommentAdd post={post} handleClose={handleClose} />
          <button
            onClick={() => {
              scrollToBottom();
            }}
          >
            scroll
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
