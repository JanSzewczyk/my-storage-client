import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Tooltip from "../Tooltip/Tooltip";

import "./EllipsisWrapper.scss";

const EllipsisWrapper = React.memo((props) => {
  const { children } = props;

  const divRef = useRef(null);
  const [allowTooltip, setAllowTooltip] = useState(false);

  useEffect(() => {
    console.log(divRef);
    const setAllowTooltipHandler = () => {
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
    };

    window.addEventListener("resize", setAllowTooltipHandler);

    return () => {
      window.removeEventListener("resize", setAllowTooltipHandler);
    };
  }, [allowTooltip, divRef]);

  if (allowTooltip) {
    return (
      <Tooltip text={children}>
        <div className={"ellipsis-wrapper"} ref={divRef}>
          {children}
        </div>
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
