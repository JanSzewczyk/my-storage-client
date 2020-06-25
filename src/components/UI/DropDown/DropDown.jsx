import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import "./DropDown.scss";

const DropDown = (props) => {
  const { title, btnType, children, top, left } = props;
  const [active, setActive] = useState(false);

  const onShow = () => {
    setActive(true);
    document.addEventListener("click", onClose);
  };

  const onClose = useCallback(() => {
    setActive(false);
    document.removeEventListener("click", onClose);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", onClose);
    };
  }, [onClose]);

  const arrowClasses = ["drop-down__icon "];
  left
    ? arrowClasses.push("drop-down__icon--left")
    : arrowClasses.push("drop-down__icon--right");

  const arrowIcon = top ? (
    <ArrowDropUpIcon className={arrowClasses.join(" ")} />
  ) : (
    <ArrowDropDownIcon className={arrowClasses.join(" ")} />
  );

  const wrapperClasses = ["drop-down__wrapper"];
  left
    ? wrapperClasses.push("drop-down__wrapper--left")
    : wrapperClasses.push("drop-down__wrapper--right");
  top
    ? wrapperClasses.push("drop-down__wrapper--top")
    : wrapperClasses.push("drop-down__wrapper--bottom");

  return (
    <div className={"drop-down"}>
      <Button clicked={active ? onClose : onShow} btnType={btnType}>
        {left && arrowIcon}
        {title}
        {!left && arrowIcon}
      </Button>

      {active && <div className={wrapperClasses.join(" ")}>{children}</div>}
    </div>
  );
};

DropDown.propTypes = {
  title: PropTypes.string.isRequired,
  top: PropTypes.bool,
  left: PropTypes.bool,
  btnType: PropTypes.oneOf(["primary", "warning"]),
  children: PropTypes.node,
};

export default DropDown;
