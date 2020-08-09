import React from "react";
import PropTypes from "prop-types";

import "./TileContent.scss";

const TileContent = ({ children, className, style }) => {
  let tileContentClasses = ["tile-content"];
  className && tileContentClasses.push(className);

  return (
    <div className={tileContentClasses.join(" ")} style={style}>
      {children}
    </div>
  );
};

TileContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default TileContent;
