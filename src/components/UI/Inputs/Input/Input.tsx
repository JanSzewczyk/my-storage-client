import React, { CSSProperties, forwardRef, ReactNode } from "react";

import { InputType } from "./types";

import "./Input.scss";

interface InputProps {
  name: string;
  type?: InputType;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  step?: number | "any";
  className?: string;
  style?: CSSProperties;
  value?: string | number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Additional config
  fullWidth?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  iconInside?: ReactNode;
}

type RefType = HTMLInputElement;

const Input = forwardRef<RefType, InputProps>(
  (
    {
      name,
      type,
      placeholder,
      step = "any",
      autoFocus,
      value,
      onChange,
      required,
      className,
      style,
      fullWidth,
      prefix,
      suffix,
      iconInside,
    },
    ref
  ) => {
    let inputClasses: string[] = ["input"];
    if (fullWidth) inputClasses.push("input--full-width");

    return (
      <div className={inputClasses.join(" ")}>
        {prefix && <div className={"input__prefix"}>{prefix}</div>}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          ref={ref}
          onChange={onChange}
          step={step}
          autoFocus={autoFocus}
          className={className}
          style={style}
          required={required}
        />
        {iconInside && <div className={"input__icon-inside"}>{iconInside}</div>}
        {suffix && <div className={"input__suffix"}>{suffix}</div>}
      </div>
    );
  }
);

export default Input;
