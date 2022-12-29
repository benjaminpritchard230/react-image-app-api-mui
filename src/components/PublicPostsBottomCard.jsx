import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PaginationButtons from "./PaginationButtons";
import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
export default function PublicPostsBottomCard({ page, setPage }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "60px",
        position: "sticky",
        bottom: 0,
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <PaginationButtons position="static" page={page} setPage={setPage} />
        </Stack>
      </CardContent>
    </Card>
  );
}
