import React from "react";
import PropTypes from "prop-types";

import "./AppBar.scss";

// TODO containers left/right

const AppBar = (props) => {
  return (
    <div className={"app-bar"}>
      <div className={"app-bar__left"}>left</div>
      <div className={"app-bar__right"}>riight</div>
    </div>
  );
};

AppBar.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

export default AppBar;
