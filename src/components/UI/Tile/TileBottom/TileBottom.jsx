import React from "react";
import PropTypes from "prop-types";

import "./TileBottom.scss";

const TileBottom = (props) => {
  const { left, right } = props;
  return (
    <div className={"tile-bottom"}>
      <div className={"tile-bottom__left"}>{left}</div>
      <div className={"tile-bottom__right"}>{right}</div>
    </div>
  );
};

TileBottom.propTypes = { left: PropTypes.node, right: PropTypes.node };

export default TileBottom;
