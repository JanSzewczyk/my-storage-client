import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Tooltip.scss";

const Tooltip = React.memo((props) => {
  const { children, text } = props;

  const [show, setShow] = useState(false);

  const onMouseOverHandler = () => {
    setShow(true);
  };

  const onMouseLeaveHandler = () => {
    setShow(false);
  };

  return (
    <div
      className={"tooltip"}
      onMouseOver={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      {show && (
        <div className={"tooltip__content"}>
          <span className={"tooltip__arrow"}></span>
          {text}
        </div>
      )}
    </div>
  );
});

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired,
};

export default Tooltip;