import React from "react";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";
import { FixMeLater } from "../../../../shared/types/common/FixMeLater";

import "./Tab.scss";

interface TabProps extends PropsWithChildren<FixMeLater> {
  title: string;
  disabled?: boolean;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className={"tab"}>{children}</div>;
};

export default Tab;
