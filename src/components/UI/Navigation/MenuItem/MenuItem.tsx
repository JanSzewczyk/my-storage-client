import React, { CSSProperties, PropsWithChildren } from "react";

import "./MenuItem.scss";

interface MenuItemProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const MenuItem = ({
  children,
  onClick,
  className,
  style,
  disabled,
}: PropsWithChildren<MenuItemProps>) => {
  let menuItemClasses: string[] = ["menu-item"];
  if (!disabled && onClick) menuItemClasses.push("menu-item--clickable");
  if (disabled) menuItemClasses.push("menu-item--disabled");
  if (className) menuItemClasses.push(className);

  return (
    <li
      className={menuItemClasses.join(" ")}
      onClick={!disabled && onClick ? onClick : undefined}
      style={style}
    >
      <span>{children}</span>
    </li>
  );
};

export default MenuItem;
