import React, { ReactNode } from "react";

import PropsWithChildren from "../../../../../shared/types/props/PropsWithChildren";

import "./ModalBody.scss";

interface ModalBodyProps extends PropsWithChildren<ReactNode> {}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <div className={"modal-body"}>{children}</div>;
};

export default ModalBody;
