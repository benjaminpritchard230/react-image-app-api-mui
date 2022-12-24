import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { useLikeMutation } from "../features/api/apiSlice";
import EditIcon from "@mui/icons-material/Edit";
export default function EditButton({ handleEditClick }) {
  const auth = useSelector((state) => state.auth);

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={<EditIcon />}
        label={"Edit"}
        variant="outlined"
        onClick={() => {
          handleEditClick();
        }}
      />
    </Stack>
  );
}
