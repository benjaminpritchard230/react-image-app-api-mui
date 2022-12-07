import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default function PaginationButtons({
  page,
  setPage,
  updatePublicPosts,
}) {
  const handlePageChange = (event, value) => {
    setPage(value);
    updatePublicPosts();
    console.log(value);
  };
  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination
        count={10}
        page={page}
        color="primary"
        onChange={handlePageChange}
      />
    </Stack>
  );
}
