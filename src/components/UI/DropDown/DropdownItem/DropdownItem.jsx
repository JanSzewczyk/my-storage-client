import React from "react";
import PropTypes from "prop-types";

import "./DropdownItem.scss";

const DropdownItem = ({ text, icon, onClick, style }) => {
  const DIClasses = ["dropdown-item"];
  onClick && DIClasses.push("dropdown-item--clickable");

  return (
    <li
      className={DIClasses.join(" ")}
      onClick={onClick && onClick}
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
};

export default DropdownItem;
