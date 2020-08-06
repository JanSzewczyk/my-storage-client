import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import "./DropDown.scss";
import DropdownWrapper from "./DropdownWrapper/DropdownWrapper";

const DropDown = ({ type, title, icon, btnType, children, top, left }) => {
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

  const IBClasses = ["drop-down__icon-button"];
  active && IBClasses.push("drop-down__icon-button--active");

  return (
    <div className={"drop-down"}>
      {type === "button" && (
        <Button onClick={active ? onClose : onShow} btnType={btnType}>
          {left && arrowIcon}
          {title}
          {!left && arrowIcon}
        </Button>
      )}
      {type === "icon" && (
        <div
          className={IBClasses.join(" ")}
          onClick={active ? onClose : onShow}
        >
          {icon}
        </div>
      )}
      {active && (
        <DropdownWrapper top={top} left={left}>
          {children}
        </DropdownWrapper>
      )}
    </div>
  );
};

DropDown.propTypes = {
  type: PropTypes.oneOf(["button", "icon"]),
  icon: PropTypes.node,
  title: PropTypes.string,
  top: PropTypes.bool,
  left: PropTypes.bool,
  btnType: PropTypes.oneOf(["primary", "warning"]),
  children: PropTypes.node,
};

DropDown.defaultProps = {
  type: "button",
};

export default DropDown;
