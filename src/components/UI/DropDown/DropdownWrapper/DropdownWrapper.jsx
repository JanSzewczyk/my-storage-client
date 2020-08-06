import React from "react";
import PropTypes from "prop-types";

import "./DropdownWrapper.scss";

const DropdownWrapper = ({ children, style, top, left }) => {
  const DWClasses = ["dropdown-wrapper"];
  top
    ? DWClasses.push("dropdown-wrapper--top")
    : DWClasses.push("dropdown-wrapper--bottom");
  left
    ? DWClasses.push("dropdown-wrapper--left")
    : DWClasses.push("dropdown-wrapper--right");

  return (
    <ul className={DWClasses.join(" ")} style={style}>
      {children}
    </ul>
  );
};

DropdownWrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  top: PropTypes.bool,
  left: PropTypes.bool,
};

export default DropdownWrapper;
