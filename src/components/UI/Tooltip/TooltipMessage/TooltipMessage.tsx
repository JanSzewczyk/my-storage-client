import React, { CSSProperties, ReactNode } from "react";
import { TooltipColor, TooltipPosition } from "../types";

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
    let tooltipMessageClasses: string[] = ["tooltip__message"];
    tooltipMessageClasses.push(`tooltip__message--${position}`);
    tooltipMessageClasses.push(`tooltip__message--${color}`);
    tooltipMessageClasses.push(`tooltip__message--${position}-${color}`);

    return (
      <div
        role={"tooltip"}
        ref={ref}
        className={tooltipMessageClasses.join(" ")}
        style={style}
        // style={{
        //   position: "absolute",
        //   willChange: "transform",
        //   top: "0px",
        //   left: "0px",
        //   transform: `translate3d(${x}px,${y}px,0)`,
        //   // width: maxTooltipWidth,
        //   // whiteSpace: maxTooltipWidth ? "normal" : "nowrap",
        // }}
      >
        {title}
      </div>
    );
  }
);

export default TooltipMessage;
