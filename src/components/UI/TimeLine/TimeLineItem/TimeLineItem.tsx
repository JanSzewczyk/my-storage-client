import React from "react";
import {
  dateToDateTimeString,
  dateToDateString,
} from "../../../../shared/utils/dateUtils";

import PropsWithChildren from "../../../../shared/types/props/PropsWithChildren";
import { TimeLineDateType } from "../types";

import "./TimeLineItem.scss";

interface TimeLineItemProps extends PropsWithChildren {
  date: Date;
  dateType?: TimeLineDateType;
}

const TimeLineItem: React.FC<TimeLineItemProps> = ({
  children,
  date,
  dateType = "date-time",
}) => {
  return (
    <li className={"time-line-item"}>
      <span className={"time-line-item__date"}>
        {dateType === "date-time" && dateToDateTimeString(date)}
        {dateType === "date" && dateToDateString(date)}
      </span>
      <div className={"time-line-item__content"}>{children}</div>
    </li>
  );
};

export default TimeLineItem;
