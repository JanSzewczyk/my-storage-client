import React, { ReactNode } from "react";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";
import { CloseIcon } from "../../DataDisplay/Icons";

import "./ModalWrapper.scss";

interface ModalWrapperProps extends PropsWithChildren<ReactNode> {
  onClose?: () => void;
  title: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onClose,
  title,
}) => {
  return (
    <div className={"modal-wrapper"}>
      <div className={"modal-wrapper__top"}>
        <div className={"modal-wrapper__title"}>{title}</div>
        {onClose && (
          <div className={"modal-wrapper__right "} onClick={onClose}>
            <CloseIcon className={"modal-wrapper__icon"} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default ModalWrapper;
