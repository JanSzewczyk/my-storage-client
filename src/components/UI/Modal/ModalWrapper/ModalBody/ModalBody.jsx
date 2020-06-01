import React from "react";
import PropTypes from "prop-types";

import "./ModalBody.scss";

const ModalBody = (props) => {
  const { children } = props;
  return <div className={"modal-body"}>{children}</div>;
};

ModalBody.propTypes = {
  children: PropTypes.node,
};

export default ModalBody;
