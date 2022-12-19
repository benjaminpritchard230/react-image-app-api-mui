import { Avatar, Button, Card, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAddCommentMutation } from "../features/api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSnackBar } from "../features/snack/snackSlice";

export default function ({ post, handleClose }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const [formState, setFormState] = useState({ body: "" });
  const [addComment, { isLoading }] = useAddCommentMutation();

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    console.log(formState, "formstate");
  };

  const id = post.id;

  const handleAddCommentClick = async () => {
    if (auth.token.length > 0) {
      try {
        await addComment({ id: id, body: formState }).unwrap();
        dispatch(
          setSnackBar({
            snackMessage: `Comment added.`,
            snackOpen: true,
            snackSeverity: "success",
          })
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(
        setSnackBar({
          snackMessage: `Log in to leave a comment.`,
          snackOpen: true,
          snackSeverity: "warning",
        })
      );
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
      }}
      elevation={1}
    >
      <Box sx={{ p: "15px" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Avatar
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            alt="user-avatar"
          />
          <TextField
            multiline
            fullWidth
            minRows={4}
            id="body"
            name="body"
            label="Enter comment..."
            type="text"
            onChange={handleChange}
          />
          <Button
            size="large"
            // sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              if (formState.body.length > 0) {
                handleAddCommentClick();
              }
            }}
          >
            Post
          </Button>
          <Button
            size="large"
            // sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
