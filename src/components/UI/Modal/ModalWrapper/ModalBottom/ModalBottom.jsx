import React from "react";
import PropTypes from "prop-types";

import "./ModalBottom.scss";

const ModalBottom = (props) => {
  const { children } = props;

  return <div className={"modal-bottom"}>{children}</div>;
};

ModalBottom.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBottom;
