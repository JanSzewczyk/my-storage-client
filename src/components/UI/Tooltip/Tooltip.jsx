import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Tooltip.scss";

const Tooltip = React.memo((props) => {
  const { children, text, type, position, color } = props;
  const [show, setShow] = useState(true);

  const onMouseOverHandler = () => {
    setShow(true);
  };

  const onMouseLeaveHandler = () => {
    setShow(false);
  };

  let tooltipClasses = ["tooltip"];
  type && tooltipClasses.push(`tooltip--${type}`);

  let TMClasses = ["tooltip__message"];
  position && TMClasses.push(`tooltip__message--${position}`);

  return (
    <div
      className={tooltipClasses.join(" ")}
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      {show && <div className={TMClasses.join(" ")}>{text}</div>}
    </div>
  );
});

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["dotted"]),
  position: PropTypes.oneOf([
    "top",
    "top-end",
    "bottom",
    "bottom-end",
    "right",
    "left",
  ]).isRequired,
  color: PropTypes.oneOf(["white", "blue", "black"]).isRequired,
};

Tooltip.defaultProps = {
  position: "top",
  color: "white",
};

export default Tooltip;
