import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { TooltipColor, TooltipPosition, TooltipType } from "./types";

import "./Tooltip.scss";
import { getApplicationWidth } from "../../../shared/utils/graphicUtils";

interface TooltipProps extends PropsWithChildren {
  text: string;
  type?: TooltipType;
  position?: TooltipPosition;
  className?: string;
  color?: TooltipColor;
}

const Tooltip: React.FC<TooltipProps> = React.memo(
  ({ children, text, type, position = "top", className, color = "white" }) => {
    const [show, setShow] = useState<boolean>(false);

    // TOOLTIP LOGIC IMPLEMENTATION
    const [maxTooltipWidth, setMaxTooltipWidth] = useState<number>();
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>(
      position
    );
    const divRef = useRef<HTMLDivElement>(null);

    const setTooltip = useCallback(
      (tp: DOMRect) => {
        const maxWidth: number = getApplicationWidth();

        if (tooltipPosition === "top" && maxWidth < tp.right) {
          const actualWidth: number = maxWidth - tp.left - 32;
          if (actualWidth < 160) {
            setTooltipPosition("top-end");
          } else {
            setMaxTooltipWidth(actualWidth);
          }
        }
      },
      [tooltipPosition]
    );
    // **********************

    useLayoutEffect(() => {
      if (null !== divRef.current) {
        setTooltip(divRef.current.getBoundingClientRect());
      }
    }, [setTooltip, show]);

    const onMouseOverHandler = () => {
      setShow(true);
    };

    const onMouseLeaveHandler = () => {
      setShow(false);
      setMaxTooltipWidth(undefined);
      setTooltipPosition(position);
    };

    let tooltipClasses: string[] = ["tooltip"];
    type && tooltipClasses.push(`tooltip--${type}`);
    className && tooltipClasses.push(className);

    let TMClasses: string[] = ["tooltip__message"];
    tooltipPosition && TMClasses.push(`tooltip__message--${tooltipPosition}`);
    color && TMClasses.push(`tooltip__message--${color}`);
    color && TMClasses.push(`tooltip__message--${position}-${color}`);

    return (
      <span
        className={tooltipClasses.join(" ")}
        onMouseOver={onMouseOverHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {children}
        {show && (
          <div
            ref={divRef}
            className={TMClasses.join(" ")}
            style={{
              width: maxTooltipWidth,
              whiteSpace: maxTooltipWidth ? "normal" : "nowrap",
            }}
          >
            {text}
          </div>
        )}
      </span>
    );
  }
);

export default Tooltip;
