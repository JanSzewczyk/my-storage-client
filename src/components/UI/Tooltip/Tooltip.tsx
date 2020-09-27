import React, { useState } from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { TooltipColor, TooltipPosition, TooltipType } from "./types";

import "./Tooltip.scss";

interface TooltipProps extends PropsWithChildren {
  text: string;
  type?: TooltipType;
  position?: TooltipPosition;
  className?: string;
  color?: TooltipColor;
}

// TODO Add show whent mouse over message
const Tooltip: React.FC<TooltipProps> = React.memo(
  ({ children, text, type, position = "top", className, color = "white" }) => {
    const [show, setShow] = useState(false);

    const onMouseOverHandler = () => {
      setShow(true);
    };

    const onMouseLeaveHandler = () => {
      setShow(false);
    };

    let tooltipClasses: string[] = ["tooltip"];
    type && tooltipClasses.push(`tooltip--${type}`);
    className && tooltipClasses.push(className);

    let TMClasses: string[] = ["tooltip__message"];
    position && TMClasses.push(`tooltip__message--${position}`);
    color && TMClasses.push(`tooltip__message--${color}`);
    color && TMClasses.push(`tooltip__message--${position}-${color}`);

    return (
      <span
        className={tooltipClasses.join(" ")}
        onMouseOver={onMouseOverHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {children}
        {show && <div className={TMClasses.join(" ")}>{text}</div>}
      </span>
    );
  }
);

export default Tooltip;
