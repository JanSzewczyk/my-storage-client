import React, { ReactNode } from "react";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";

import "./AppContent.scss";

interface AppContentProps extends PropsWithChildren<ReactNode> {}

const AppContent: React.FC<AppContentProps> = ({ children }) => {
  return <div className={"app-content"}>{children}</div>;
};

export default AppContent;
