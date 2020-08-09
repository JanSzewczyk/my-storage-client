import React from "react";
import PropTypes from "prop-types";

import "./DropdownItem.scss";

const DropdownItem = ({ text, icon, onClick, style, disabled }) => {
  const DIClasses = ["dropdown-item"];
  !disabled && onClick && DIClasses.push("dropdown-item--clickable");
  disabled && DIClasses.push("dropdown-item--disabled");

  return (
    <li
      className={DIClasses.join(" ")}
      onClick={!disabled && onClick && onClick}
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
