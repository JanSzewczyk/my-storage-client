import React, { useState } from "react";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Button from "../../Inputs/Button";
import { withKnobs } from "@storybook/addon-knobs";
import Dropdown from "./Dropdown";
import { MenuItem } from "../Menu";

export default {
  title: "Dropdown",
  component: Dropdown,
  componentSubtitle: "Dropdown and types",
  decorators: [withKnobs],
};

export const Default = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Aux>
      <Button onClick={handleClick}>Open Menu</Button>
      <Dropdown
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>Menu Item 1 disabled</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem onClick={() => console.log("onClick")}>
          Menu Item 3 clickable
        </MenuItem>
        <MenuItem onClick={() => console.log("onClick")}>
          Menu Item 4 clickable
        </MenuItem>
        <MenuItem onClick={() => handleClose()}>
          Menu Item 5 handleClose()
        </MenuItem>
      </Dropdown>
    </Aux>
  );
};
