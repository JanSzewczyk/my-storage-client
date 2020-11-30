import React, { CSSProperties, PropsWithChildren } from "react";
import { ButtonColor, ButtonType } from "../Button";

import "./IconButton.scss";

interface IconButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  color?: ButtonColor;
  className?: string;
  style?: CSSProperties;
}

type RefType = HTMLButtonElement;

const IconButton = React.forwardRef<
  RefType,
  PropsWithChildren<IconButtonProps>
>(
  (
    {
      type = "button",
      onClick,
      disabled,
      children,
      color = "default",
      className,
      style,
    },
    ref
  ) => {
    let buttonClasses: string[] = ["button", "icon-button"];
    color && buttonClasses.push(`button--${color}`);
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
        {React.Children.only(children)}
      </button>
    );
  }
);

export default IconButton;
