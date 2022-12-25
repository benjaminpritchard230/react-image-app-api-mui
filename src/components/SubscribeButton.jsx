import { useGetCurrentUserInfoQuery } from "../features/api/apiSlice";
import Button from "@mui/material/Button";
import { useFollowUserMutation } from "../features/api/apiSlice";
import { Tooltip } from "@mui/material";

const SubscribeButton = ({ id }) => {
  const {
    data: currentUserInfoData,
    error,
    isError,
    isLoading,
  } = useGetCurrentUserInfoQuery();

  console.log(currentUserInfoData, "cuid");
  const [followUser] = useFollowUserMutation();

  const handleSubscribeClick = () => {
    followUser(id);
  };

  return (
    <Tooltip
      title={
        !isLoading && currentUserInfoData.following.includes(parseInt(id))
          ? "Click to unsubscribe"
          : "Click to subscribe"
      }
      placement={"right"}
    >
      <Button
        variant={
          !isLoading && currentUserInfoData.following.includes(parseInt(id))
            ? "outlined"
            : "contained"
        }
        onClick={() => {
          handleSubscribeClick();
        }}
      >
        {!isLoading && currentUserInfoData.following.includes(parseInt(id))
          ? "Subscribed"
          : "Subscribe"}
      </Button>
    </Tooltip>
  );
};

export default SubscribeButton;
