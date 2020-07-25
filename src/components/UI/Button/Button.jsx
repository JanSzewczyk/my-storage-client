import React from "react";

import PropTypes from "prop-types";

import "./Button.scss";

const Button = ({ onClick, disabled, children, btnType, className }) => {
  let buttonClasses = ["button"];
  btnType && buttonClasses.push(`button--${btnType}`);
  className && buttonClasses.push(className);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses.join(" ")}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.oneOf(["primary", "warning"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
