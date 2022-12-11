import * as React from "react";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { useMakePrivateMutation } from "../features/api/apiSlice";

export default function TogglePrivateSwitch({ post }) {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const [checked, setChecked] = useState(post.public === true ? false : true);
  const [makePrivate, { isLoading }] = useMakePrivateMutation();

  const handleChange = () => {
    setChecked(!checked);
    makePrivate(post);
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
