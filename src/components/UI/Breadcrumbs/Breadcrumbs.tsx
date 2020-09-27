import React from "react";

import { BreadcrumbsItemType } from "./BreadcrumbItem/types";
import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";

import Aux from "../../../hoc/Auxiliary/Auxiliary";

import "./Breadcrumbs.scss";

// TODO Add type
type BreadcrumbsItemChildrenType =
  | BreadcrumbsItemType[]
  | BreadcrumbsItemType
  | null
  | undefined;

interface BreadcrumbsProps extends PropsWithChildren<any> {}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children }) => {
  return (
    <div className={"breadcrumbs"}>
      {children && children.length > 0
        ? children
            .filter((child: BreadcrumbsItemType) => Boolean(child))
            .map((child: BreadcrumbsItemType, index: number) => (
              <Aux key={index}>
                {child}
                {children.length > index + 1 && <span>&#47;</span>}
              </Aux>
            ))
        : children}
    </div>
  );
};

export default Breadcrumbs;
