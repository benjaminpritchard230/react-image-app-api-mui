import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useGetUserInfoQuery } from "../features/api/apiSlice";
import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";

export default function UserCard({}) {
  const { id } = useParams();
  const {
    data: userInfoData,
    error,
    isError,
    isLoading,
  } = useGetUserInfoQuery(id);

  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Avatar
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            alt="user-avatar"
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h4" component="div">
            {!isLoading
              ? capitalizeString(userInfoData.username)
              : "Loading..."}
          </Typography>
        </Stack>{" "}
        <Stack
          direction={{ xs: "column", xl: "row" }}
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 1, xl: 3 }}
          divider={<Divider orientation="vertical" flexItem />}
          mt={2}
        >
          <Typography variant="h5" component="div">
            Location: Warrington
          </Typography>
          <Typography variant="h5" component="div">
            Joined: 23/4/2019
          </Typography>
          <Typography variant="h5" component="div">
            Last seen: just now
          </Typography>
          <Typography variant="h5" component="div">
            About me: Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Corporis dolor iure itaque cum sunt earum sed unde voluptas fugiat
            optio! Porro, dolores. Facere commodi odio tempora optio
            reprehenderit aut perferendis?
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
