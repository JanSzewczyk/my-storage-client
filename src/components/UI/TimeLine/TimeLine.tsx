import React from "react";

import PropsWithChildren from "../../../shared/types/props/PropsWithChildren";

import "./TimeLine.scss";

interface TimeLineProps extends PropsWithChildren {
  className?: string;
}

const TimeLine: React.FC<TimeLineProps> = ({ children, className }) => {
  let timeLineClasses = ["time-line"];
  className && timeLineClasses.push(className);

  return <ul className={timeLineClasses.join(" ")}>{children}</ul>;
};

export default TimeLine;
