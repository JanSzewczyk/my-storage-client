import React, { CSSProperties, ReactNode } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { ButtonColor, ButtonType } from "./types";

import "./Button.scss";

interface ButtonProps extends PropsWithChildren<ReactNode> {
  type?: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  btnType?: ButtonColor;
  className?: string;
  style?: CSSProperties;
}

type RefType = HTMLButtonElement;

const Button = React.forwardRef<RefType, ButtonProps>(
  (
    {
      type = "button",
      onClick,
      disabled,
      children,
      btnType = "default",
      className,
      style,
    },
    ref
  ) => {
    let buttonClasses: string[] = ["button"];
    btnType && buttonClasses.push(`button--${btnType}`);
    className && buttonClasses.push(className);

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses.join(" ")}
        ref={ref}
        style={style}
      >
        {children}
      </button>
    );
  }
);

export default Button;
