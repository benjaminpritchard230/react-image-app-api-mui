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

const CommentsList = ({ post }) => {
  const {
    data: postCommentsData,
    error,
    isError,
    isLoading,
  } = useGetPostCommentsQuery(post.id);

  const displayComments = () => {
    if (!isLoading) {
      return postCommentsData.map((comment) => (
        <CommentDisplay comment={comment} key={comment.id} />
      ));
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [postCommentsData]);

  return <div ref={messagesEndRef}>{displayComments()}</div>;
};

export default CommentsList;
