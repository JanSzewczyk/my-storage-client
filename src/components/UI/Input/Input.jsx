import React from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./Input.scss";

const Input = (props) => {
  const {
    labelClass,
    refInput,
    config,
    inputClass,
    label,
    errorClass,
    hasError,
    errorMessage,
    inputType
  } = props;

  let labelClasses = ["label"];
  let inputClasses = ["input"];
  let errorClasses = ["error"];

  inputType && labelClasses.push(`label--${inputType}`);
  inputType && inputClasses.push(`input--${inputType}`)

  hasError && inputClasses.push("input--invalid");

  labelClass && labelClasses.push(labelClass);
  inputClass && inputClasses.push(inputClass);
  errorClass && errorClasses.push(errorClass);

  return (
    <Aux>
      {label && (
        <label htmlFor={config.name} className={labelClasses.join(" ")}>
          {label}
        </label>
      )}
      <input
        id={config.name}
        className={inputClasses.join(" ")}
        ref={refInput}
        {...config}
      />
      {hasError && errorMessage && (
        <div className={errorClasses.join(" ")}>{errorMessage}</div>
      )}
    </Aux>
  );
};

Input.propTypes = {
  labelClass: PropTypes.string,
  label: PropTypes.string,
  inputClass: PropTypes.string,
  inputType: PropTypes.oneOf(["edit"]),
  config: PropTypes.shape({
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
  refInput: PropTypes.func,
  errorClass: PropTypes.string,
  hasError: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default Input;
