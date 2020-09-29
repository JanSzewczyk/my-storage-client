import React, { CSSProperties, ReactNode } from "react";
import PropTypes from "prop-types";

import "./DropdownItem.scss";

interface DropdownItemProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  text,
  icon,
  onClick,
  style,
  disabled,
}) => {
  const dropdownItemClasses: string[] = ["dropdown-item"];
  !disabled && onClick && dropdownItemClasses.push("dropdown-item--clickable");
  disabled && dropdownItemClasses.push("dropdown-item--disabled");

  return (
    <li
      className={dropdownItemClasses.join(" ")}
      onClick={!disabled && onClick ? onClick : undefined}
      style={style}
    >
      {icon && <div className={"dropdown-item__icon"}>{icon}</div>}
      <span>{text}</span>
    </li>
  );
};

DropdownItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default DropdownItem;
