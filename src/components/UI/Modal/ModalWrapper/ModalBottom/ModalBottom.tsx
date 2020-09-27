import React, { ReactNode } from "react";

import PropsWithChildren from "../../../../../shared/types/props/PropsWithChildren";

import "./ModalBottom.scss";

interface ModalBottomProps extends PropsWithChildren<ReactNode> {}

const ModalBottom: React.FC<ModalBottomProps> = ({ children }) => {
  return <div className={"modal-bottom"}>{children}</div>;
};

export default ModalBottom;
