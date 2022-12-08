import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useCallback } from "react";
export default function PaginationButtons({ page, setPage, publicPostCount }) {
  const style = {
    margin: 0,
    top: "auto",
    right: "46%",
    bottom: 35,
    position: "fixed",
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

  const count = Math.ceil(publicPostCount / 12);

  return (
    <Stack spacing={2} style={style}>
      <Pagination
        count={count}
        page={page}
        color="primary"
        onChange={handlePageChange}
      />
    </Stack>
  );
}
