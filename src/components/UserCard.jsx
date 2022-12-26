import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useGetUserInfoQuery } from "../features/api/apiSlice";
import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import ReactTimeAgo from "react-time-ago";
import { useSelector } from "react-redux";
import FollowButton from "./FollowButton";

export default function UserCard({}) {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;

  const {
    data: userInfoData,
    error,
    isError,
    isLoading,
  } = useGetUserInfoQuery(id);

  if (token.length > 0) {
  }

  console.log(userInfoData);
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
        {!isLoading ? (
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
              {capitalizeString(userInfoData.username)}
            </Typography>
            {token.length > 0 ? <FollowButton id={id} /> : null}
          </Stack>
        ) : null}

        {!isLoading ? (
          <Stack
            direction={{ xs: "column", xl: "row" }}
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 1, xl: 3 }}
            divider={<Divider orientation="vertical" flexItem />}
            mt={2}
          >
            <Typography variant="h5" component="div">
              {userInfoData.location
                ? capitalizeString(userInfoData.location)
                : null}
            </Typography>
            <Typography variant="h5" component="div">
              Joined{" "}
              {<ReactTimeAgo date={Date.parse(userInfoData.date_joined)} />}
            </Typography>

            <Typography variant="h5" component="div">
              {userInfoData.about_me
                ? capitalizeString(userInfoData.about_me)
                : null}
            </Typography>
            <Typography variant="h5" component="div">
              Followers: {userInfoData.followers.length}
            </Typography>
          </Stack>
        ) : null}
      </CardContent>
    </Card>
  );
}
