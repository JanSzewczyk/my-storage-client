import React, { CSSProperties, ReactNode } from "react";

import "./TileBottom.scss";

interface TileBottomProps {
  left?: ReactNode;
  right?: ReactNode;
  style?: CSSProperties;
}

const TileBottom: React.FC<TileBottomProps> = ({ left, right, style }) => {
  return (
    <div className={"tile-bottom"} style={style}>
      <div className={"tile-bottom__left"}>{left}</div>
      <div className={"tile-bottom__right"}>{right}</div>
    </div>
  );
};

export default TileBottom;
