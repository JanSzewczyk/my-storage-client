import React from "react";
import PropTypes from "prop-types";

import "./Tab.scss";

const Tab = (props) => {
  const { children } = props;

  return <div className={"tab"}>{children}</div>;
};

Tab.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Tab;
