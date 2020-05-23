import React from "react";
import PropTypes from "prop-types";

import "./TileContent.scss";

const TileContent = (props) => {
  const { children } = props;
  return <div className={"tile-content"}>{children}</div>;
};

TileContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TileContent;
