import React, { useState, useEffect, useCallback, ReactNode } from "react";

import DropdownWrapper from "./DropdownWrapper/DropdownWrapper";
import { DropdownType } from "./types";
import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { ButtonType } from "../Button";

import Button from "../Button/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import "./DropDown.scss";

interface DropdownProps extends PropsWithChildren<any> {
  type?: DropdownType;
  title?: string;
  icon?: ReactNode;
  btnType?: ButtonType;
  top?: boolean;
  left?: boolean;
}

const DropDown: React.FC<DropdownProps> = ({
  type = "button",
  title,
  icon,
  btnType,
  children,
  top,
  left,
}) => {
  const [active, setActive] = useState<boolean>(false);

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

  const arrowClasses: string[] = ["drop-down__icon "];
  left
    ? arrowClasses.push("drop-down__icon--left")
    : arrowClasses.push("drop-down__icon--right");

  const arrowIcon = top ? (
    <ArrowDropUpIcon className={arrowClasses.join(" ")} />
  ) : (
    <ArrowDropDownIcon className={arrowClasses.join(" ")} />
  );

  const IBClasses: string[] = ["drop-down__icon-button"];
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

DropDown.defaultProps = {
  type: "button",
};

export default DropDown;
