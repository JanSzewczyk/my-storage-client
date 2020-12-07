import React, {
  CSSProperties,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import { getApplicationWidth } from "../../../../shared/utils/graphicUtils";
import Backdrop from "../../Backdrop";

import "./Menu.scss";

interface MenuProps {
  id: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
}

const Menu = ({
  id,
  anchorEl,
  open,
  onClose,
  children,
  className,
  style,
}: PropsWithChildren<MenuProps>) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      event.stopPropagation();
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    open && document.addEventListener("click", handleClickOutside);

    return () => {
      open && document.removeEventListener("click", handleClickOutside);
    };
  }, [onClose, open]);

  let menuClasses: string[] = ["menu"];
  if (className) menuClasses.push(className);

  const pos = anchorEl?.getBoundingClientRect();

  return open && pos ? (
    <Backdrop
      style={{
        background: "none",
      }}
    >
      <ul
        id={id}
        className={menuClasses.join(" ")}
        style={{
          ...style,
          top: pos.bottom - 8,
          right: getApplicationWidth() - pos.right - 8,
        }}
        ref={menuRef}
      >
        {children}
      </ul>
    </Backdrop>
  ) : null;
};

export default Menu;
