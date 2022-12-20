import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useGetUserInfoQuery } from "../features/api/apiSlice";
import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
export default function UserCard({}) {
  const { id } = useParams();
  const {
    data: userInfoData,
    error,
    isError,
    isLoading,
  } = useGetUserInfoQuery(id);
  console.log(userInfoData);

  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardContent>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Avatar
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            alt="user-avatar"
          />
          <Typography variant="h5" component="div">
            {!isLoading ? userInfoData.username : "Loading..."}'s profile:
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
