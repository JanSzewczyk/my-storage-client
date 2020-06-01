import React from "react";
import PropTypes from "prop-types";

import "./TileTop.scss";

const TileTop = (props) => {
  const { left, right } = props;
  return (
    <div className={"tile-top"}>
      <div className={"tile-top__left"}>{left}</div>
      <div className={"tile-top__right"}>{right}</div>
    </div>
  );
};

TileTop.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

export default TileTop;
