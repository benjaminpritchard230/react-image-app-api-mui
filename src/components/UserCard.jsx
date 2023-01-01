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
import { Tooltip } from "@mui/material";

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

  // console.log(userInfoData.followers_names, "follows vbt");
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const followers_names =
    !isLoading && userInfoData.followers_names.length > 0
      ? `Followed by ${userInfoData.followers_names.join(", ").toString()}`
      : "No followers yet";

  const following_names =
    !isLoading && userInfoData.following_names.length > 0
      ? `Following ${userInfoData.following_names.join(", ").toString()}`
      : "Not following anyone yet";

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

            {userInfoData.about_me.length > 0 ? (
              <Typography variant="h5" component="div">
                {capitalizeString(userInfoData.about_me)}
              </Typography>
            ) : null}
            <Tooltip title={followers_names} placement="top">
              <Typography variant="h5" component="div">
                Followers: {userInfoData.followers.length}
              </Typography>
            </Tooltip>
            <Tooltip title={following_names} placement="top">
              <Typography variant="h5" component="div">
                Following: {userInfoData.following.length}
              </Typography>
            </Tooltip>
          </Stack>
        ) : null}
      </CardContent>
    </Card>
  );
}
