import React from "react";
import PropTypes from "prop-types";

import "./AppBar.scss";

const AppBar = (props) => {
  const { left, right } = props;
  return (
    <div className={"app-bar"}>
      <div className={"app-bar__left"}>{left}</div>
      <div className={"app-bar__right"}>{right}</div>
    </div>
  );
};

AppBar.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

export default AppBar;
