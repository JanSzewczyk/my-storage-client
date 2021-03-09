import React, { CSSProperties, PropsWithChildren, ReactNode } from "react";

import { TileHeader, TileSizeConfig } from "./types";

import "./Tile.scss";

interface TileProps {
  //  config
  header?: TileHeader;
  tileSize?: TileSizeConfig;
  right?: ReactNode;
  fullScreen?: boolean;

  //  style
  className?: string;
  style?: CSSProperties;
}

/**
 *
 * tileSize {
    sm: "sm-12",
    md: "md-12",
    lg: "lg-12",
    xl: "xl-12",
  }
 */
const Tile: React.FC<PropsWithChildren<TileProps>> = ({
  children,
  className,
  style,
  fullScreen,
  header,
  tileSize,
  right,
}) => {
  let tileClasses: string[] = ["tile"];

  if (tileSize)
    tileClasses = tileClasses.concat([
      `tile--row`,
      `tile--${tileSize.sm}`,
      `tile--${tileSize.md}`,
      `tile--${tileSize.lg}`,
      `tile--${tileSize.xl}`,
    ]);

  if (fullScreen) tileClasses.push("tile--full-screen");
  if (className) tileClasses.push(className);

  return (
    <div className={tileClasses.join(" ")} style={style}>
      {header && (
        <div className={"tile__header"}>
          <div className={"tile__left"}>
            <div className={"tile__title"}>{header.title}</div>
            <div className={"tile__subtitle"}>{header.subtitle}</div>
          </div>
          <div className={"tile__right"}>
            {header.right}
            {right}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tile;
