import React, { CSSProperties, forwardRef, PropsWithChildren } from "react";

import "./Label.scss";

interface LabelProps {
  name?: string;
  className?: string;
  style?: CSSProperties;
}

type RefType = HTMLLabelElement;

const Label = forwardRef<RefType, PropsWithChildren<LabelProps>>(
  ({ children, name, className, style }, ref) => {
    let labelClasses: string[] = ["label"];
    if (className) labelClasses.push(className);

    return (
      <label
        id={`${name}Label`}
        htmlFor={name}
        className={labelClasses.join(" ")}
        style={style}
        ref={ref}
      >
        <span>{children}</span>
      </label>
    );
  }
);

export default Label;
