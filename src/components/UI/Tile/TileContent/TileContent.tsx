import React, { CSSProperties, ReactNode } from "react";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";

import "./TileContent.scss";

interface TileContentProps extends PropsWithChildren<ReactNode> {
  className?: string;
  style?: CSSProperties;
}

const TileContent: React.FC<TileContentProps> = ({
  children,
  className,
  style,
}) => {
  let tileContentClasses: string[] = ["tile-content"];
  className && tileContentClasses.push(className);

  return (
    <div className={tileContentClasses.join(" ")} style={style}>
      {children}
    </div>
  );
};

export default TileContent;
