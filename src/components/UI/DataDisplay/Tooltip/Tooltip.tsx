import React, {
  CSSProperties,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { TooltipColor, TooltipPosition } from "./types";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";
import useWindowSize from "../../../../hooks/useWindowSize";

import TooltipMessage from "./TooltipMessage/TooltipMessage";

interface TooltipProps extends PropsWithChildren {
  text: ReactNode;
  position?: TooltipPosition;
  color?: TooltipColor;
  className?: string;
  style?: CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = "top",
  className,
  color = "white",
  style,
}) => {
  const windowSize = useWindowSize();

  const [coordinates, setCoordinates] = useState<any>(null);

  const messageRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<any>(null);

  const setTooltip = useCallback(
    (chp: DOMRect) => {
      const maxWidth: number = windowSize.width;
      const maxHeight: number = windowSize.height;

      if (position === "top")
        setCoordinates({
          x: chp.left,
          y: chp.top - maxHeight,
          maxWidth: maxWidth - chp.left - 32,
        });

      if (position === "top-end")
        setCoordinates({
          x: chp.right - maxWidth,
          y: chp.top - maxHeight,
          maxWidth: chp.right - 24,
        });

      if (position === "bottom")
        setCoordinates({
          x: chp.left,
          y: chp.bottom,
          maxWidth: maxWidth - chp.left - 24,
        });

      if (position === "bottom-end")
        setCoordinates({
          x: chp.right - maxWidth,
          y: chp.bottom,
          maxWidth: chp.right - 24,
        });

      if (position === "right")
        setCoordinates({
          x: chp.right,
          y: chp.top,
          maxWidth: maxWidth - chp.right - 32,
        });

      if (position === "left")
        setCoordinates({
          x: chp.left - maxWidth,
          y: chp.top,
          maxWidth: chp.left - 32,
        });
    },
    [position, windowSize.height, windowSize.width]
  );

  const onMouseOverHandler = useCallback(() => {
    if (null !== childrenRef.current) {
      setTooltip(childrenRef.current.getBoundingClientRect());
    }
  }, [setTooltip]);

  const onMouseLeaveHandler = useCallback(() => {
    setCoordinates(null);
  }, []);

  useLayoutEffect(() => {
    if (null !== childrenRef.current) {
      childrenRef.current.onmouseover = () => onMouseOverHandler();
      childrenRef.current.onmouseout = () => onMouseLeaveHandler();
    }
  }, [onMouseLeaveHandler, onMouseOverHandler]);

  const handleScroll = useCallback(() => {
    if (null !== childrenRef.current && null !== messageRef.current) {
      setTooltip(childrenRef.current.getBoundingClientRect());
    }
  }, [setTooltip]);

  useLayoutEffect(() => {
    coordinates && window.addEventListener("scroll", handleScroll, true);

    return () =>
      coordinates && window.removeEventListener("scroll", handleScroll, true);
  }, [coordinates, handleScroll]);

  const setPosition = (): CSSProperties => {
    if (position === "top-end") return { bottom: "0px", right: "0px" };
    if (position === "bottom" || position === "right")
      return { top: "0px", left: "0px" };
    if (position === "bottom-end" || position === "left")
      return { top: "0px", right: "0px" };

    return { bottom: "0px", left: "0px" };
  };

  return (
    <Aux>
      {React.cloneElement(children, { ref: childrenRef })}
      {coordinates &&
        createPortal(
          <TooltipMessage
            title={text}
            position={position}
            color={color}
            ref={messageRef}
            className={className}
            style={{
              ...setPosition(),
              willChange: "transform",
              transform: `translate3d(${coordinates?.x}px,${coordinates?.y}px,0)`,
              maxWidth: coordinates?.maxWidth,
              ...style,
            }}
          />,
          document.body
        )}
    </Aux>
  );
};

export default Tooltip;
