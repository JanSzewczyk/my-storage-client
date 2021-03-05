import React, { useState } from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { EllipsisVIcon } from "../../UI/DataDisplay/Icons";
import IconButton from "../../UI/Inputs/IconButton";
import Dropdown from "../../UI/Navigation/Dropdown";
import { MenuItem } from "../../UI/Navigation/Menu";

interface EmployeeDropdownOptionProps {
  onEditEmployee: () => void;
  activeEditEmployee: boolean;
  onRemoveEmployee: () => void;
  activeRemoveEmployee: boolean;
}

const EmployeeDropdownOption = ({
  onEditEmployee,
  activeEditEmployee,
  onRemoveEmployee,
  activeRemoveEmployee,
}: EmployeeDropdownOptionProps) => {
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
        <MenuItem onClick={onEditEmployee} disabled={!activeEditEmployee}>
          Edit
        </MenuItem>
        <MenuItem onClick={onRemoveEmployee} disabled={!activeRemoveEmployee}>
          Remove
        </MenuItem>
      </Dropdown>
    </Aux>
  );
};

export default EmployeeDropdownOption;
