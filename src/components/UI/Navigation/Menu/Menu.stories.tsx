import React, { useState } from "react";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import Button from "../../Inputs/Button";
import { withKnobs } from "@storybook/addon-knobs";
import Menu from "./Menu";
import MenuItem from "../MenuItem";

export default {
  title: "Menu",
  component: Menu,
  componentSubtitle: "Menu and types",
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
      <Menu
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
      </Menu>
    </Aux>
  );
};
