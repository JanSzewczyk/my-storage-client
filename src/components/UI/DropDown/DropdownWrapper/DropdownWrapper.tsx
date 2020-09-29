import React, { CSSProperties } from "react";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";

import "./DropdownWrapper.scss";

interface DropdownWrapperProps extends PropsWithChildren {
  style?: CSSProperties;
  top?: boolean;
  left?: boolean;
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({
  children,
  style,
  top,
  left,
}) => {
  const DWClasses: string[] = ["dropdown-wrapper"];
  top
    ? DWClasses.push("dropdown-wrapper--top")
    : DWClasses.push("dropdown-wrapper--bottom");
  left
    ? DWClasses.push("dropdown-wrapper--left")
    : DWClasses.push("dropdown-wrapper--right");

  return (
    <ul className={DWClasses.join(" ")} style={style}>
      {children}
    </ul>
  );
};

export default DropdownWrapper;
