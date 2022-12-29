import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetPublicPostsQuery } from "../features/api/apiSlice";
export default function PaginationButtons({ page, setPage }) {
  const style = {
    margin: 0,
    top: "auto",
    right: "46%",
    bottom: 35,
    position: "fixed",
  };
  const { data: publicPostsData, isLoading } = useGetPublicPostsQuery(page);
  const handlePageChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

  const count = !isLoading ? Math.ceil(publicPostsData.count / 9) : 0;

  return (
    <Pagination
      count={count}
      page={page}
      color="primary"
      onChange={handlePageChange}
    />
  );
}
