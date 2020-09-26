import React, { ReactNode } from "react";

import "./AppBar.scss";

interface AppBarProps {
  left?: ReactNode;
  right?: ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ left, right }) => {
  return (
    <div className={"app-bar"}>
      <div className={"app-bar__left"}>{left}</div>
      <div className={"app-bar__right"}>{right}</div>
    </div>
  );
};

export default AppBar;
