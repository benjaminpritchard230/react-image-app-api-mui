import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../features/snack/snackSlice";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEditUserProfileMutation } from "../features/api/apiSlice";

import MyDropzone from "./MyDropzone";
export default function EditUserAvatarDialog({
  editUserAvatarDialog,
  setEditUserAvatarDialog,
}) {
  const dispatch = useDispatch();

  const [editUserProfile] = useEditUserProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditUserAvatarDialog(false);
    const data = new FormData(e.target);
    data.append("public", true);
    console.log(data, "data");
    try {
      await editUserProfile(data).unwrap();
      dispatch(
        setSnackBar({
          snackMessage: "New post created",
          snackOpen: true,
          snackSeverity: "success",
        })
      );
    } catch (err) {
      console.log(err, "err");
      dispatch(
        setSnackBar({
          snackMessage: "Unable to create new post.",
          snackOpen: true,
          snackSeverity: "error",
        })
      );
    }
  };
  const handleClose = () => {
    setEditUserAvatarDialog(false);
  };
  return (
    <>
      <Dialog
        open={editUserAvatarDialog}
        PaperProps={{
          sx: {
            width: {
              lg: "100vw",
              xl: "33vw",
            },
          },
        }}
        fullWidth
        maxWidth="md"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Change your user avatar</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {" "}
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <MyDropzone
              inputProps={{
                id: "profile_image",
                label: "image",
                name: "profile_image",
              }}
              accept={{
                "image/png": [".png", ".jpeg", ".jpg", ".webp"],
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                  </div>
                </section>
              )}
            </MyDropzone>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Edit profile</Button>
            <Button
              onClick={() => {
                setEditUserAvatarDialog(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
