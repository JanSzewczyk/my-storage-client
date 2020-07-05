import React from "react";
import PropTypes from "prop-types";

import "./TimeLine.scss";

const TimeLine = (props) => {
  const { children, className } = props;

  let TLClasses = ["time-line"];

  className && TLClasses.push(className);

  return <ul className={TLClasses.join(" ")}>{children}</ul>;
};

TimeLine.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TimeLine;
