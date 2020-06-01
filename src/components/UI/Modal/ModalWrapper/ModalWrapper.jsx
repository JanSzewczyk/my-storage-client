import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";

import "./ModalWrapper.scss";

const ModalWrapper = (props) => {
  const { children, onClose, title } = props;
  return (
    <div className={"modal-wrapper"}>
      <div className={"modal-wrapper__top"}>
        <div className={"modal-wrapper__title"}>{title}</div>
        {onClose && (
          <div className={"modal-wrapper__right "} onClick={onClose}>
            <CloseIcon className={"modal-wrapper__icon"} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.node.isRequired,
};

export default ModalWrapper;
