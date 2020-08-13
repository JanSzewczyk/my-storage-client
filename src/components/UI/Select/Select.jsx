import React from "react";
import PropTypes from "prop-types";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./Select.scss";

const Select = (props) => {
  const {
    labelClass,
    refSelect,
    config,
    selectClass,
    label,
    errorClass,
    hasError,
    errorMessage,
    // inputType,
    options,
  } = props;

  let labelClasses = ["select-label"];
  let selectClasses = ["select"];
  let errorClasses = ["error"];

  // inputType && labelClasses.push(`label--${inputType}`);
  // inputType && inputClasses.push(`input--${inputType}`)

  hasError && selectClasses.push("select--invalid");

  labelClass && labelClasses.push(labelClass);
  selectClass && selectClasses.push(selectClass);
  errorClass && errorClasses.push(errorClass);

  return (
    <Aux>
      {label && (
        <label htmlFor={config.name} className={labelClasses.join(" ")}>
          {label}
        </label>
      )}
      <select
        id={config.name}
        className={selectClasses.join(" ")}
        ref={refSelect}
        {...config}
      >
        {options.map((op, index) => (
          <option key={index} value={op.value}>
            {op.key}
          </option>
        ))}
      </select>
      {hasError && errorMessage && (
        <div className={errorClasses.join(" ")}>{errorMessage}</div>
      )}
    </Aux>
  );
};

Select.propTypes = {
  labelClass: PropTypes.string,
  label: PropTypes.string,
  selectClass: PropTypes.string,
  config: PropTypes.shape({
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.any,
    })
  ).isRequired,
  refSelect: PropTypes.func,
  errorClass: PropTypes.string,
  hasError: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default Select;
