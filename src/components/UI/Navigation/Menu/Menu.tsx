import React, { CSSProperties, forwardRef, PropsWithChildren } from "react";

import "./Menu.scss";

interface MenuProps {
  visible?: boolean;

  className?: string;
  style?: CSSProperties;
}

type RefType = HTMLDivElement;

const Menu = forwardRef<RefType, PropsWithChildren<MenuProps>>(
  ({ children, visible = true, className, style }, ref) => {
    let menuClasses: string[] = ["menu"];
    if (visible) menuClasses.push("menu--visible");

    if (className) menuClasses.push(className);

    return (
      <div ref={ref} className={menuClasses.join(" ")} style={style}>
        {children}
      </div>
    );
  }
);

export default Menu;
