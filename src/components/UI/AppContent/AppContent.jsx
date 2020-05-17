import React from "react";
import PropTypes from "prop-types";

import "./AppContent.scss";

// TODO flex wrap options / column

const AppContent = (props) => {
  const { children } = props;
  return <div className={"app-content"}>{children}</div>;
};

AppContent.propTypes = {
  children: PropTypes.node,
};

export default AppContent;
