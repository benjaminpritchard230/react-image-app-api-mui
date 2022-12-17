import { Avatar, Button, Card, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useAddCommentMutation } from "../features/api/apiSlice";

export default function ({ post }) {
  const [formState, setFormState] = useState({ body: "hello" });
  const [addComment, { isLoading }] = useAddCommentMutation();

  const handleChange = ({ target: { name, value } }) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    console.log(formState, "formstate");
  };

  const id = post.id;

  const handleAddCommentClick = async () => {
    try {
      await addComment({ id: id, body: formState }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card>
      <Box sx={{ p: "15px" }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            variant="rounded"
            alt="user-avatar"
          />
          <TextField
            multiline
            fullWidth
            minRows={4}
            id="body"
            name="body"
            label="Body"
            type="text"
            placeholder="Type your comment here..."
            onChange={handleChange}
          />
          <Button
            size="large"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              handleAddCommentClick();
            }}
          >
            Add comment
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
