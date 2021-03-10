import React, { CSSProperties, ReactNode } from "react";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";
import { ButtonColor, ButtonType } from "./types";

import "./Button.scss";

interface ButtonProps extends PropsWithChildren<ReactNode> {
  type?: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: ButtonColor;
  auto?: boolean;
  big?: boolean;
  className?: string;
  style?: CSSProperties;
  withIcon?: ReactNode;
}

type RefType = HTMLButtonElement;

const Button = React.forwardRef<RefType, ButtonProps>(
  (
    {
      type = "button",
      onClick,
      disabled,
      children,
      color = "default",
      className,
      style,
      auto,
      big,
      withIcon,
    },
    ref
  ) => {
    let buttonClasses: string[] = ["button"];
    if (color) buttonClasses.push(`button--${color}`);
    if (className) buttonClasses.push(className);
    if (auto) buttonClasses.push(`button--auto`);
    if (big) buttonClasses.push(`button--big`);

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses.join(" ")}
        ref={ref}
        style={style}
      >
        {withIcon && <div className={"button__icon"}>{withIcon}</div>}
        {children}
      </button>
    );
  }
);

export default Button;
