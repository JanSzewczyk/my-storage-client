import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Tooltip.scss";

const Tooltip = React.memo(({ children, text, type, position, className, color } ) => {
  
  const [show, setShow] = useState(false);

  const onMouseOverHandler = () => {
    setShow(true);
  };

  const onMouseLeaveHandler = () => {
    setShow(false);
  };

  let tooltipClasses = ["tooltip"];
  type && tooltipClasses.push(`tooltip--${type}`);
  className && tooltipClasses.push(className);

  let TMClasses = ["tooltip__message"];
  position && TMClasses.push(`tooltip__message--${position}`);
  color && TMClasses.push(`tooltip__message--${color}`);
  color && TMClasses.push(`tooltip__message--${position}-${color}`);

  return (
    <span
      className={tooltipClasses.join(" ")}
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      {show && <div className={TMClasses.join(" ")}>{text}</div>}
    </span>
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
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  position: "top",
  color: "white",
};

export default Tooltip;
