import { Avatar, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import { useGetCurrentUserInfoQuery } from "../features/api/apiSlice";
import EditButton from "./EditButton";
import EditUserAvatarDialog from "./EditUserAvatarDialog";
import EditUserProfileDialog from "./EditUserProfileDialog";

import { useState } from "react";
export default function PrivateUserCard() {
  const [editUserProfileDialog, setEditUserProfileDialog] = useState(false);
  const [editUserAvatarDialog, setEditUserAvatarDialog] = useState(false);

  const handleEditUserProfileClick = () => {
    setEditUserProfileDialog(!editUserProfileDialog);
  };

  const handleEditUserAvatarClick = () => {
    setEditUserAvatarDialog(!editUserAvatarDialog);
  };

  const auth = useSelector((state) => state.auth);

  const { data: userInfoData, isLoading } = useGetCurrentUserInfoQuery();
  console.log(userInfoData);
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
    <>
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
            {" "}
            <Typography variant="h4" component="div">
              Your profile
            </Typography>
            <EditButton
              handleEditClick={handleEditUserProfileClick}
              text={"Edit profile"}
            />
          </Stack>{" "}
          {!isLoading ? (
            <Stack
              direction={{ xs: "column", xl: "row" }}
              alignItems="center"
              justifyContent="center"
              spacing={{ xs: 1, xl: 3 }}
              divider={<Divider orientation="vertical" flexItem />}
              mt={2}
            >
              <Stack
                direction={"column"}
                alignItems="center"
                justifyContent="center"
                spacing={1}
                mt={2}
              >
                <Avatar
                  src={`https://escooter230.pythonanywhere.com/${userInfoData.profile_image}`}
                  alt="user-avatar"
                  sx={{ width: 100, height: 100 }}
                />
                <EditButton
                  handleEditClick={handleEditUserAvatarClick}
                  text={"Edit avatar"}
                />
              </Stack>

              <Typography variant="h4" component="div">
                {!isLoading
                  ? capitalizeString(userInfoData.username)
                  : "Loading..."}
              </Typography>
              <Typography variant="h5" component="div">
                {!isLoading && userInfoData.location
                  ? capitalizeString(userInfoData.location)
                  : null}
              </Typography>
              <Typography variant="h5" component="div">
                Joined{" "}
                {<ReactTimeAgo date={Date.parse(userInfoData.date_joined)} />}
              </Typography>

              <Typography variant="h5" component="div">
                About:{" "}
                {!isLoading && userInfoData.about_me
                  ? capitalizeString(userInfoData.about_me)
                  : null}
              </Typography>
              <Tooltip title={followers_names}>
                <Typography variant="h5" component="div">
                  Followers: {userInfoData.followers.length}
                </Typography>
              </Tooltip>
              <Tooltip title={following_names}>
                <Typography variant="h5" component="div">
                  Following: {userInfoData.following.length}
                </Typography>
              </Tooltip>
            </Stack>
          ) : null}
        </CardContent>
      </Card>
      <EditUserProfileDialog
        editUserProfileDialog={editUserProfileDialog}
        setEditUserProfileDialog={setEditUserProfileDialog}
      />
      <EditUserAvatarDialog
        editUserAvatarDialog={editUserAvatarDialog}
        setEditUserAvatarDialog={setEditUserAvatarDialog}
      />
    </>
  );
}
