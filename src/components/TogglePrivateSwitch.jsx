import * as React from "react";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useMakePrivateMutation } from "../features/api/apiSlice";
import { setSnackBar } from "../features/snack/snackSlice";

export default function TogglePrivateSwitch({ post }) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(post.public === true ? false : true);
  const [makePrivate, { isLoading }] = useMakePrivateMutation();

  const handleChange = async () => {
    // setChecked(!checked);
    try {
      await makePrivate(post).unwrap();
      if (post.public === true) {
        dispatch(
          setSnackBar({
            snackMessage: `Post is now private.`,
            snackOpen: true,
            snackSeverity: "warning",
          })
        );
      } else {
        dispatch(
          setSnackBar({
            snackMessage: `Post is now public.`,
            snackOpen: true,
            snackSeverity: "warning",
          })
        );
      }

      console.log(post.public);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        label={"Private"}
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      ></FormControlLabel>
    </FormGroup>
  );
}
