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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useMarkNotificationReadMutation } from "../features/api/apiSlice";

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

  const [markRead] = useMarkNotificationReadMutation();

  useEffect(() => {
    console.log(notificationsData, "notificationsdata");
  }, [notificationsData]);

  const NotificationDisplay = ({ notification }) => {
    if (notification.unread === true) {
      return (
        <>
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  markRead(notification.id);
                }}
              >
                <DoneIcon />
              </IconButton>
            }
          >
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
                    {/* <ReactTimeAgo date={Date.parse(notification.timestamp)} /> */}
                    {notification.unread ? "true" : "false"}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
        </>
      );
    }
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
        <Box sx={{ border: 0, p: 1, bgcolor: "background.paper" }}>
          <List
            sx={{
              width: "100%",
              maxHeight: "500px",
              bgcolor: "background.paper",
            }}
          >
            {displayNotifications()}
          </List>
        </Box>
      </Popover>
    </div>
  );
}
