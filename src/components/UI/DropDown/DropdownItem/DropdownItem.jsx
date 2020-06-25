import React from "react";
import PropTypes from "prop-types";

import "./DropdownItem.scss";

const DropdownItem = (props) => {
  const { children, onClick } = props;
  return (
    <div className={"dropdown-item"} onClick={onClick}>
      {children}
    </div>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default DropdownItem;
