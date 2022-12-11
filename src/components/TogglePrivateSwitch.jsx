import * as React from "react";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

export default function TogglePrivateSwitch({ post }) {
  const auth = useSelector((state) => state.auth);
  const token = auth.token;
  const [checked, setChecked] = useState(post.public === true ? false : true);

  const editPostUrl = `http://localhost:8000/posts/${post.id}/`;

  const handleChange = (event) => {
    setChecked(!checked);
    axios
      .put(
        editPostUrl,
        { caption: post.caption, public: !post.public },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
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
