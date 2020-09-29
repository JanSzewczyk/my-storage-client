import React, { ReactNode } from "react";

import "./Tile.scss";
import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { TileHeader, TileSizeConfig } from "./types";

interface TileProps extends PropsWithChildren<ReactNode> {
  tileClass?: string;
  header?: TileHeader;
  tileSize?: TileSizeConfig;
}

const Tile: React.FC<TileProps> = ({
  children,
  tileClass,
  header,
  tileSize = {
    sm: "sm-12",
    md: "md-12",
    lg: "lg-12",
    xl: "xl-12",
  },
}) => {
  let tileClasses: string[] = ["tile"];

  tileClasses = tileClasses.concat([
    `tile--${tileSize.sm}`,
    `tile--${tileSize.md}`,
    `tile--${tileSize.lg}`,
    `tile--${tileSize.xl}`,
  ]);

  tileClass && tileClasses.push(tileClass);

  return (
    <div className={tileClasses.join(" ")}>
      {header && (
        <div className={"tile__header"}>
          <div className={"tile__left"}>
            <div className={"tile__title"}>{header.title}</div>
            <div className={"tile__subtitle"}>{header.subtitle}</div>
          </div>
          <div className={"tile__right"}>{header.right}</div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tile;
