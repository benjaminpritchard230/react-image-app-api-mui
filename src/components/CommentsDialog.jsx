import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useGetPostCommentsQuery } from "../features/api/apiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

  const {
    data: postCommentsData,
    error,
    isError,
    isLoading,
  } = useGetPostCommentsQuery(post.id);
  if (commentsDialog === true) {
    console.log(postCommentsData, "comments");
  }

  return (
    <div>
      <Modal
        open={commentsDialog}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
