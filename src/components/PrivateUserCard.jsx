import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useGetUserInfoQuery } from "../features/api/apiSlice";
import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import ReactTimeAgo from "react-time-ago";
import { useSelector } from "react-redux";
import EditButton from "./EditButton";
import EditUserProfileDialog from "./EditUserProfileDialog";
import EditUserAvatarDialog from "./EditUserAvatarDialog";
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

  const { data: userInfoData, isLoading } = useGetUserInfoQuery(auth.id);
  console.log(userInfoData);
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
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
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
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
