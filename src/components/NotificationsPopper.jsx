import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { Popover } from "@mui/material";
import { useGetNotificationsQuery } from "../features/api/apiSlice";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ReactTimeAgo from "react-time-ago";
import { useEffect } from "react";

export default function NotificationsPopper({
  handleOpenNotificationsMenu,
  handleCloseNotificationsMenu,
  anchorElNotifications,
  setAnchorElNotifications,
}) {
  const open = Boolean(anchorElNotifications);
  const id = open ? "notifications-popper" : undefined;

  const {
    data: notificationsData,
    error,
    isError,
    isLoading,
  } = useGetNotificationsQuery();

  useEffect(() => {
    console.log(notificationsData, "notificationsdata");
  }, [notificationsData]);

  const NotificationDisplay = ({ notification }) => {
    return (
      <>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={notification.verb}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <ReactTimeAgo date={Date.parse(notification.timestamp)} />
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider component="li" />
      </>
    );
  };

  const displayNotifications = () => {
    if (!isLoading && notificationsData.length > 0) {
      return notificationsData.map((notification) => (
        <NotificationDisplay
          notification={notification}
          key={notification.id}
        />
      ));
    } else {
      return "No notifications yet.";
    }
  };

  return (
    <div>
      <Popover
        id={id}
        open={open}
        onClose={handleCloseNotificationsMenu}
        anchorEl={anchorElNotifications}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {displayNotifications()}
          </List>
        </Box>
      </Popover>
    </div>
  );
}
