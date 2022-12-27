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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function PublicPostsTopCard({
  followingPosts,
  setFollowingPosts,
}) {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const token = auth.token;

  const handleChange = () => {
    setFollowingPosts(!followingPosts);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "70px",
      }}
    >
      <CardContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={followingPosts} onChange={handleChange} />
            }
            label={
              followingPosts
                ? "Showing posts from follows"
                : "Showing posts from everyone"
            }
            labelPlacement="start"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
}
