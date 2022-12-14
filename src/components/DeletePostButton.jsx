import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { setSnackBar } from "../features/snack/snackSlice";
import { useDeleteMutation } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { Chip } from "@mui/material";
const DeletePostButton = ({ post }) => {
  const dispatch = useDispatch();
  const [deletePost] = useDeleteMutation();
  const handleDeleteClick = async () => {
    try {
      await deletePost(post.id).unwrap();
      dispatch(
        setSnackBar({
          snackMessage: "Post deleted.",
          snackOpen: true,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setSnackBar({
          snackMessage: "That post does not exist.",
          snackOpen: true,
        })
      );
    }
  };
  return (
    <Tooltip title="Delete" placement="top">
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

export default DeletePostButton;
