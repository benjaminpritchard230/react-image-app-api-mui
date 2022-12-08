import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useCallback } from "react";
export default function PaginationButtons({
  page,
  setPage,

  updatePublicPosts,
  publicPostCount,
}) {
  const handlePageChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

  const count = Math.ceil(publicPostCount / 5);

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination
        count={6}
        page={page}
        color="primary"
        onChange={handlePageChange}
      />

      <Typography>
        Page: {page} count: {count}{" "}
      </Typography>
    </Stack>
  );
}
