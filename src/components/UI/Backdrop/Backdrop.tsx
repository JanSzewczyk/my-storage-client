import React, { CSSProperties, ReactNode, useEffect } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";

import "./Backdrop.scss";

interface BackdropProps extends PropsWithChildren<ReactNode> {
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Backdrop: React.FC<BackdropProps> = ({
  children,
  onClose,
  className,
  style,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  let backdropClasses: string[] = ["backdrop"];
  if (className) backdropClasses.push(className);

  return (
    <div className={backdropClasses.join(" ")} onClick={onClose} style={style}>
      {children}
    </div>
  );
};

export default Backdrop;
