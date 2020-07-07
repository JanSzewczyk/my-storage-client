import React from "react";
import PropTypes from "prop-types";

import {
  dateToDateTimeString,
  dateToDateString,
} from "../../../../shared/utils/dateUtils";

import "./TimeLineItem.scss";

const TimeLineItem = (props) => {
  const { date, dateType, children } = props;

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

TimeLineItem.propTypes = {
  children: PropTypes.node,
  dateType: PropTypes.oneOf(["date-time", "date"]).isRequired,
  date: PropTypes.objectOf(Date).isRequired,
};

TimeLineItem.defaultProps = {
  dateType: "date-time",
};

export default TimeLineItem;
