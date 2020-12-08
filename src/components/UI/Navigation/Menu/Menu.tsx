import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  getApplicationWidth,
} from "../../../../shared/utils/graphicUtils";

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
  const [coordinates, setCoordinates] = useState<any>(null);

  const setTooltip = useCallback((chp: DOMRect) => {
    const maxWidth: number = getApplicationWidth();

    setCoordinates({
      x: chp.right - maxWidth + 8,
      y: chp.bottom - 8,
    });
  }, []);

  const handleScroll = useCallback(
    (event: any) => {
      if (null !== anchorEl) {
        setTooltip(anchorEl.getBoundingClientRect());
      }
    },
    [anchorEl, setTooltip]
  );

  useLayoutEffect(() => {
    if (null !== anchorEl) {
      setTooltip(anchorEl.getBoundingClientRect());
    }
  }, [anchorEl, setTooltip]);

  useLayoutEffect(() => {
    coordinates && window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [coordinates, handleScroll, onClose]);

  const handleClickOutside = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    open && document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside, open]);

  let menuClasses: string[] = ["menu"];
  if (className) menuClasses.push(className);

  return open ? (
    <ul
      id={id}
      className={menuClasses.join(" ")}
      style={{
        ...style,
        top: 0,
        right: 0,
        willChange: "transform",
        transform: `translate3d(${coordinates?.x}px,${coordinates?.y}px,0)`,
      }}
      ref={menuRef}
    >
      {children}
    </ul>
  ) : (
    <></>
  );
};

export default Menu;
