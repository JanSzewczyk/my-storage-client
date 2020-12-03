import React, { useState, useEffect, useCallback, ReactNode } from "react";

import DropdownWrapper from "./DropdownWrapper/DropdownWrapper";
import { DropdownType } from "./types";
import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";
import { ButtonColor } from "../Button";
import { FixMeLater } from "../../../shared/types/common/FixMeLater";

import Button from "../Button/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import "./DropDown.scss";

interface DropdownProps extends PropsWithChildren<any> {
  type?: DropdownType;
  title?: string;
  icon?: ReactNode;
  btnType?: ButtonColor;
  top?: boolean;
  left?: boolean;
}

export type Ref = FixMeLater;

const DropDown = React.forwardRef<Ref, DropdownProps>(
  ({ type = "button", title, icon, btnType, children, top, left }, ref) => {
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
          <Button onClick={active ? onClose : onShow} color={btnType} ref={ref}>
            {left && arrowIcon}
            {title}
            {!left && arrowIcon}
          </Button>
        )}
        {type === "icon" && (
          <div
            className={IBClasses.join(" ")}
            onClick={active ? onClose : onShow}
            ref={ref}
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
  }
);

export default DropDown;
