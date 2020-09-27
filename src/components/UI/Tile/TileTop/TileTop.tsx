import React, { ReactNode } from "react";

import "./TileTop.scss";

interface TileTopProps {
  left?: ReactNode;
  right?: ReactNode;
}

const TileTop: React.FC<TileTopProps> = ({ left, right }) => {
  return (
    <div className={"tile-top"}>
      <div className={"tile-top__left"}>{left}</div>
      <div className={"tile-top__right"}>{right}</div>
    </div>
  );
};

export default TileTop;
