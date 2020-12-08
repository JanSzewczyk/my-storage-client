import React, { CSSProperties, ReactNode } from "react";
import { TooltipColor, TooltipPosition } from "../types";

import "./TooltipMessage.scss";

interface TooltipMessageProps {
  title: ReactNode;
  position: TooltipPosition;
  color: TooltipColor;
  className?: string;
  style?: CSSProperties;
}

type RefType = HTMLDivElement;

const TooltipMessage = React.forwardRef<RefType, TooltipMessageProps>(
  ({ title, position, color, className, style }, ref) => {
    let tooltipMessageClasses: string[] = ["tooltip-message"];
    tooltipMessageClasses.push(`tooltip-message--${position}`);
    tooltipMessageClasses.push(`tooltip-message--${color}`);
    tooltipMessageClasses.push(`tooltip-message--${position}-${color}`);
    if (className) tooltipMessageClasses.push(className);

    return (
      <div
        role={"tooltip"}
        ref={ref}
        className={tooltipMessageClasses.join(" ")}
        style={style}
      >
        {title}
      </div>
    );
  }
);

export default TooltipMessage;
