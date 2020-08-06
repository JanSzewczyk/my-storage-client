import React from "react";
import PropTypes from "prop-types";

import "./TileBottom.scss";

const TileBottom = ({ left, right, style }) => {
  return (
    <div className={"tile-bottom"} style={style}>
      <div className={"tile-bottom__left"}>{left}</div>
      <div className={"tile-bottom__right"}>{right}</div>
    </div>
  );
};

TileBottom.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
  style: PropTypes.object,
};

export default TileBottom;
