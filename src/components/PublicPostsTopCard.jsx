import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function PublicPostsTopCard({
  followingPosts,
  setFollowingPosts,
}) {
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
