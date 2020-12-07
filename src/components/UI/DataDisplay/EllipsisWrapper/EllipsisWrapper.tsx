import React, { useRef, useCallback, useState, useEffect } from "react";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";

import Tooltip from "../../Tooltip/Tooltip";

import "./EllipsisWrapper.scss";

interface EllipsisWrapperProps extends PropsWithChildren {}

const EllipsisWrapper: React.FC<EllipsisWrapperProps> = ({ children }) => {
  const divRef = useRef<any>(null);
  const [allowTooltip, setAllowTooltip] = useState<boolean>(false);

  const setAllowTooltipHandler = useCallback(() => {
    if (divRef.current) {
      if (
        !allowTooltip &&
        divRef.current.scrollWidth > divRef.current.offsetWidth
      ) {
        setAllowTooltip(true);
      }

      if (
        allowTooltip &&
        divRef.current.scrollWidth <= divRef.current.offsetWidth
      ) {
        setAllowTooltip(false);
      }
    }
  }, [allowTooltip, divRef]);

  useEffect(() => {
    setAllowTooltipHandler();

    window.addEventListener("resize", setAllowTooltipHandler);

    return () => {
      window.removeEventListener("resize", setAllowTooltipHandler);
    };
  }, [allowTooltip, divRef, setAllowTooltipHandler]);

  if (allowTooltip) {
    return (
      <Tooltip text={children}>
        <span className={"ellipsis-wrapper"} ref={divRef}>
          {children}
        </span>
      </Tooltip>
    );
  }

  return (
    <div className={"ellipsis-wrapper"} ref={divRef}>
      {children}
    </div>
  );
};

export default EllipsisWrapper;
