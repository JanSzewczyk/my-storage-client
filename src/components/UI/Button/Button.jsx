import React from "react";

import PropTypes from "prop-types";

import "./Button.scss";

const Button = (props) => {
  const { clicked, disabled, children, btnType, btnClass } = props;
  let buttonClasses = ["button"];

  btnType && buttonClasses.push(`button--${btnType}`);

  btnClass && buttonClasses.push(btnClass);

  return (
    <button
      onClick={clicked}
      disabled={disabled}
      className={buttonClasses.join(" ")}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.oneOf(["primary", "warning"]),
  btnClass: PropTypes.any,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
