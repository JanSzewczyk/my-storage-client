import React from "react";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { SelectConfig, SelectOption } from "./types";

import "./Select.scss";

interface SelectProps {
  options: SelectOption[];
  labelClass?: string;
  refSelect: any;
  config: SelectConfig;
  selectClass?: string;
  label: string;
  errorClass?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const Select: React.FC<SelectProps> = ({
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
}) => {
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

export default Select;
