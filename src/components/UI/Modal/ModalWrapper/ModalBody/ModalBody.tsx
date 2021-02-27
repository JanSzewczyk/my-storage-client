import React, { CSSProperties, ReactNode } from "react";

import PropsWithChildren from "../../../../../shared/types/props/PropsWithChildren";

import "./ModalBody.scss";

interface ModalBodyProps extends PropsWithChildren<ReactNode> {
  className?: string;
  style?: CSSProperties;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
  style,
}) => {
  let modalBodyClasses: string[] = ["modal-body"];
  if (className) modalBodyClasses.push(className);

  return (
    <div className={modalBodyClasses.join(" ")} style={style}>
      {children}
    </div>
  );
};

export default ModalBody;
