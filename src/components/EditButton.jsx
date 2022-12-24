import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
export default function EditButton({ handleEditClick, text }) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        icon={<EditIcon />}
        label={text}
        variant="outlined"
        onClick={() => {
          handleEditClick();
        }}
      />
    </Stack>
  );
}
