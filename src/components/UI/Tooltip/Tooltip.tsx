import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { TooltipColor, TooltipPosition, TooltipType } from "./types";

import "./Tooltip.scss";
import { getApplicationWidth } from "../../../shared/utils/graphicUtils";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface TooltipProps extends PropsWithChildren {
  text: string;
  type?: TooltipType;
  position?: TooltipPosition;
  color?: TooltipColor;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  type,
  position = "top",
  className,
  color = "white",
}) => {
  const [show, setShow] = useState<boolean>(false);

  // TOOLTIP LOGIC IMPLEMENTATION
  const [maxTooltipWidth, setMaxTooltipWidth] = useState<number>();
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>(
    position
  );

  const [pos, setPos] = useState<any>();

  const divRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const setTooltip = useCallback((tp: DOMRect) => {
    const maxWidth: number = getApplicationWidth();

    if (null !== divRef.current) {
      const xxx = divRef.current.getBoundingClientRect();

      console.log(tp, xxx);
      setPos({
        x: tp.x,
        y: tp.y - xxx.height,
      });
    }

    // setx(tp.x);
    // sety(tp.y);

    // if (tooltipPosition === "top" && maxWidth < tp.right) {
    //   const actualWidth: number = maxWidth - tp.left - 32;
    //   if (actualWidth < 160) {
    //     setTooltipPosition("top-end");
    //   } else {
    //     setMaxTooltipWidth(actualWidth);
    //   }
    // }
  }, []);
  // **********************

  const onMouseOverHandler = useCallback(() => {
    setShow(true);
    // if (null !== childrenRef.current) {
    //   setTooltip(childrenRef.current.getBoundingClientRect());
    //   // setTooltip(divRef.current.getBoundingClientRect());
    // }
  }, []);

  const onMouseLeaveHandler = useCallback(() => {
    setShow(false);
    setMaxTooltipWidth(undefined);
    setTooltipPosition(position);
  }, [position]);

  useLayoutEffect(() => {
    if (null !== childrenRef.current) {
      childrenRef.current.onmouseover = () => onMouseOverHandler();
      childrenRef.current.onmouseout = () => onMouseLeaveHandler();
      // setTooltip(divRef.current.getBoundingClientRect());
    }
  }, [onMouseLeaveHandler, onMouseOverHandler]);

  // useLayoutEffect(() => {
  //   if (show && null !== childrenRef.current) {
  //     setTooltip(childrenRef.current.getBoundingClientRect());
  //     // setTooltip(divRef.current.getBoundingClientRect());
  //   }
  // }, [setTooltip, show]);

  useEffect(() => {
    console.log("useEffect()");
    if (show && null !== childrenRef.current) {
      setTooltip(childrenRef.current.getBoundingClientRect());
      // setTooltip(divRef.current.getBoundingClientRect());
    }
  }, [setTooltip, show]);

  // TODO ADD SCROLL ACTION
  // useEffect(() => {
  //   const handleScroll = (event: any) => {
  //     if (null !== childrenRef.current)
  //       setTooltip(childrenRef.current.getBoundingClientRect());
  //     // console.log("elo");
  //     // let scrollTop = event.srcElement.body;
  //     // console.log(scrollTop);
  //     // const itemTranslate = Math.min(0, scrollTop / 3 - 60);
  //     // setState({
  //     //   transform: itemTranslate,
  //     // });
  //   };

  //   window.addEventListener("scroll", handleScroll, true);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [setTooltip]);

  // useLayoutEffect(() => {
  //   if (null !== childrenRef.current) {
  //     setTooltip(childrenRef.current.getBoundingClientRect());
  //   }
  // }, [onMouseLeaveHandler, setTooltip, show]);

  let tooltipClasses: string[] = ["tooltip"];
  type && tooltipClasses.push(`tooltip--${type}`);
  className && tooltipClasses.push(className);

  let TMClasses: string[] = ["tooltip__message"];
  tooltipPosition && TMClasses.push(`tooltip__message--${tooltipPosition}`);
  color && TMClasses.push(`tooltip__message--${color}`);
  color && TMClasses.push(`tooltip__message--${position}-${color}`);

  // TODO REMOVE!!!
  // console.log(childrenRef);

  return (
    <Aux>
      {React.cloneElement(children, { ref: childrenRef })}
      {show &&
        createPortal(
          <div
            role={"tooltip"}
            ref={divRef}
            className={TMClasses.join(" ")}
            style={{
              // position: "absolute",
              willChange: "transform",
              top: "0px",
              left: "0px",
              transform: `translate3d(${pos?.x}px,${pos?.y}px,0)`,
              width: maxTooltipWidth,
              whiteSpace: maxTooltipWidth ? "normal" : "nowrap",
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </Aux>
  );
};

export default Tooltip;
