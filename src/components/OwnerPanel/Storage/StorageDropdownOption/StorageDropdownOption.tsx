import React, { useState } from "react";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import { EditIcon } from "../../../UI/DataDisplay/Icons";
import IconButton from "../../../UI/Inputs/IconButton";
import Menu from "../../../UI/Navigation/Menu";
import MenuItem from "../../../UI/Navigation/MenuItem";

interface StorageDropdownOptionProps {
  onEditStorage: () => void;
  activeEditStorage: boolean;
  onRemoveStorage: () => void;
  activeRemoveStorage: boolean;
}

const StorageDropdownOption = ({
  onEditStorage,
  activeEditStorage,
  onRemoveStorage,
  activeRemoveStorage,
}: StorageDropdownOptionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Aux>
      <IconButton onClick={handleClick}>
        <EditIcon />
      </IconButton>
      <Menu
        id="storage-dropdown"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onEditStorage();
            setAnchorEl(null);
          }}
          disabled={!activeEditStorage}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onRemoveStorage();
            setAnchorEl(null);
          }}
          disabled={!activeRemoveStorage}
        >
          Remove
        </MenuItem>
      </Menu>
    </Aux>
  );
};

export default StorageDropdownOption;
