import React from "react";
import PropTypes from "prop-types";

import "./Backdrop.scss";

const Backdrop = (props) => {
  const { children, onClose } = props;
  return (
    <div className={"backdrop"} onClick={onClose}>
      {children}
    </div>
  );
};

Backdrop.propTypes = {
  onClose: PropTypes.func,
};

export default Backdrop;
