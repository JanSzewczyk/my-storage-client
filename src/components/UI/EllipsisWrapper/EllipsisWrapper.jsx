import React, { useRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Tooltip from "../Tooltip/Tooltip";

import "./EllipsisWrapper.scss";

const EllipsisWrapper = React.memo((props) => {
  const { children } = props;

  const divRef = useRef(null);
  const [allowTooltip, setAllowTooltip] = useState(false);

  const setAllowTooltipHandler = useCallback(() => {
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
      <Tooltip text={children} className={"ellipsis-wrapper__tooltip"}>
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
});

EllipsisWrapper.propTypes = {
  children: PropTypes.string.isRequired,
};

export default EllipsisWrapper;
