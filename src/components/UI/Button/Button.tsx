import React, { ReactNode } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { ButtonType } from "./types";

import "./Button.scss";

interface ButtonProps extends PropsWithChildren<ReactNode> {
  onClick?: () => void;
  disabled?: boolean;
  btnType?: ButtonType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  btnType,
  className,
}) => {
  let buttonClasses: string[] = ["button"];
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

export default Button;
