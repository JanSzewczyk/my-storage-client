import React, { ReactNode } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";

import "./Backdrop.scss";

interface BackdropProps extends PropsWithChildren<ReactNode> {
  onClose?: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ children, onClose }) => {
  return (
    <div className={"backdrop"} onClick={onClose}>
      {children}
    </div>
  );
};

export default Backdrop;
