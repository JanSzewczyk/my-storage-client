import moment from "moment";

export const DATE_PATTERN = "DD.MM.YY";
export const DATE_TIME_PATTERN = "DD.MM.YY HH:mm";

export const dateToDateString = (dateObject) => {
  let date = moment(dateObject);
  return date.format(DATE_PATTERN);
};

export const dateToDateTimeString = (dateObject) => {
  let date = moment(dateObject);
  return date.format(DATE_TIME_PATTERN);
};

export const dateToPatternDateString = (dateObject, pattern) => {
  let date = moment(dateObject);
  return date.format(pattern);
};

export const dateToLocalDateString = (dateObject) => {
  let date = moment(dateObject);
  return date.format("YYYY-MM-DD");
};
