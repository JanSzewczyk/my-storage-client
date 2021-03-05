import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import useWindowSize from "../../../../hooks/useWindowSize";

import Menu from "../Menu";

import "./Dropdown.scss";

interface DropdownProps {
  id: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  className?: string;
  style?: CSSProperties;
}

const Dropdown = ({
  id,
  anchorEl,
  open,
  onClose,
  children,
  className,
  style,
}: PropsWithChildren<DropdownProps>) => {
  const [coordinates, setCoordinates] = useState<any>(null);

  const windowSize = useWindowSize();
  const menuRef = useRef<HTMLDivElement>(null);

  const setTooltip = useCallback(
    (chp: DOMRect) => {
      setCoordinates({
        x: chp.right - windowSize.width,
        y: chp.bottom,
      });
    },
    [windowSize.width]
  );

  const handleScroll = useCallback(
    (event: any) => {
      if (null !== anchorEl) {
        console.log("sad");
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
    coordinates && window.addEventListener("resize", handleScroll);

    return () => {
      coordinates && window.removeEventListener("scroll", handleScroll, true);
      coordinates && window.removeEventListener("resize", handleScroll);
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

  let menuClasses: string[] = ["dropdown"];
  if (className) menuClasses.push(className);

  const maxWidth = windowSize.width + coordinates?.x - 10;

  return (
    <Menu
      ref={menuRef}
      visible={open && anchorEl !== null}
      className={menuClasses.join(" ")}
      style={{
        ...style,
        top: 0,
        right: 0,
        maxWidth: maxWidth ? maxWidth : 0,
        willChange: "transform",
        transform: `translate3d(${coordinates?.x}px,${coordinates?.y}px,0)`,
      }}
    >
      {children}
    </Menu>
  );

  // open ? (
  //   <ul
  //     id={id}
  //     className={menuClasses.join(" ")}
  //     style={{
  //       ...style,
  //       top: 0,
  //       right: 0,
  //       willChange: "transform",
  //       transform: `translate3d(${coordinates?.x}px,${coordinates?.y}px,0)`,
  //     }}
  //     ref={menuRef}
  //   >
  //     {children}
  //   </ul>
  // ) : (
  //   <></>
  // );
};

export default Dropdown;
