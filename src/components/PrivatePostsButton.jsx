import * as React from "react";

import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
const PrivatePostsButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      {location.pathname === "/private" ? (
        <Button
          onClick={() => {
            navigate("/");
          }}
          color="inherit"
        >
          All posts
        </Button>
      ) : (
        <Button
          onClick={() => {
            navigate("/private");
          }}
          color="inherit"
        >
          Private posts
        </Button>
      )}
    </>
  );
};

export default PrivatePostsButton;
