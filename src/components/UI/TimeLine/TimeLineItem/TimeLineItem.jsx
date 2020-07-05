import React from "react";
import PropTypes from "prop-types";

import { dateToDateTimeString } from "../../../../shared/utils/dateUtils";

import "./TimeLineItem.scss";

const TimeLineItem = (props) => {
  const { date, children } = props;

  return (
    <li className={"time-line-item"}>
      <span className={"time-line-item__date"}>
        {dateToDateTimeString(date)}
      </span>
      <div className={"time-line-item__content"}>{children}</div>
    </li>
  );
};

TimeLineItem.propTypes = {
  children: PropTypes.node,
  date: PropTypes.objectOf(Date).isRequired,
};

export default TimeLineItem;
