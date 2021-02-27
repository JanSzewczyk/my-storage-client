import React, { ReactNode } from "react";

import PropsWithChildren from "../../../../../shared/types/props/PropsWithChildren";

import "./Tab.scss";

interface TabProps extends PropsWithChildren<ReactNode> {
  title: string;
  disabled?: boolean;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className={"tab"}>{children}</div>;
};

export default Tab;
