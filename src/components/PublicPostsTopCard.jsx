import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PaginationButtons from "./PaginationButtons";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
export default function PublicPostsTopCard({
  followingPosts,
  setFollowingPosts,
  page,
  setPage,
}) {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;

  const handleChange = () => {
    setFollowingPosts(!followingPosts);
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: "50px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          height: "62px",
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          sx={{ alignItems: "center", justifyContent: "end" }}
        >
          {token.length > 0 ? (
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
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
