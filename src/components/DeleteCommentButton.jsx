import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { setSnackBar } from "../features/snack/snackSlice";
import { useDeleteMutation } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { useDeleteCommentMutation } from "../features/api/apiSlice";
import { Chip } from "@mui/material";
const DeleteCommentButton = ({ comment }) => {
  const dispatch = useDispatch();
  const [deleteComment] = useDeleteCommentMutation();
  const handleDeleteClick = async () => {
    try {
      await deleteComment(comment.id).unwrap();
      dispatch(
        setSnackBar({
          snackMessage: "Comment deleted.",
          snackOpen: true,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setSnackBar({
          snackMessage: "That comment does not exist.",
          snackOpen: true,
        })
      );
    }
  };
  return (
    <Tooltip title="Delete" placement="bottom">
      <Chip
        icon={<DeleteIcon />}
        variant="outlined"
        label="Delete"
        onClick={() => {
          handleDeleteClick();
        }}
      />
    </Tooltip>
  );
};

export default DeleteCommentButton;
