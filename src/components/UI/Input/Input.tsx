import React from "react";

import { InputConfig, InputType } from "./types";

import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./Input.scss";

interface InputProps {
  labelClass?: string;
  refInput?: (Ref: any, validateRule?: any) => void;
  config: InputConfig;
  inputClass?: string;
  label?: string;
  errorClass?: string;
  hasError?: boolean;
  errorMessage?: string;
  inputType?: InputType;
}

const Input: React.FC<InputProps> = ({
  labelClass,
  refInput,
  config,
  inputClass,
  label,
  errorClass,
  hasError,
  errorMessage,
  inputType,
}) => {
  let labelClasses: string[] = ["label"];
  let inputClasses: string[] = ["input"];
  let errorClasses: string[] = ["error"];

  inputType && labelClasses.push(`label--${inputType}`);
  inputType && inputClasses.push(`input--${inputType}`);

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

export default Input;
