import React, { useState } from "react";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import { EllipsisVIcon } from "../../../UI/DataDisplay/Icons";
import IconButton from "../../../UI/Inputs/IconButton";
import Dropdown from "../../../UI/Navigation/Dropdown";
import { MenuItem } from "../../../UI/Navigation/Menu";

interface StorageDropdownOptionProps {
  onShowDetails: () => void;
  onEditStorage: () => void;
  activeEditStorage: boolean;
  onRemoveStorage: () => void;
  activeRemoveStorage: boolean;
}

const StorageDropdownOption = ({
  onShowDetails,
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
      <IconButton
        onClick={handleClick}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <EllipsisVIcon />
      </IconButton>
      <Dropdown
        id="storage-dropdown"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            onShowDetails();
            setAnchorEl(null);
          }}
          selected={!activeEditStorage}
        >
          Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEditStorage();
            setAnchorEl(null);
          }}
          selected={activeEditStorage}
        >
          Edit
        </MenuItem>
        <hr />
        <MenuItem
          onClick={() => {
            onRemoveStorage();
            setAnchorEl(null);
          }}
          disabled={!activeRemoveStorage}
        >
          Remove
        </MenuItem>
      </Dropdown>
    </Aux>
  );
};

export default StorageDropdownOption;
