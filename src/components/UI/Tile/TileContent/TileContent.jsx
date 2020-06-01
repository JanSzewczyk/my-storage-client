import React from "react";
import PropTypes from "prop-types";

import "./TileContent.scss";

const TileContent = (props) => {
  const { children, className } = props;

  let tileContentClasses = ["tile-content"];
  className && tileContentClasses.push(className);

  return <div className={tileContentClasses.join(" ")}>{children}</div>;
};

TileContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default TileContent;
