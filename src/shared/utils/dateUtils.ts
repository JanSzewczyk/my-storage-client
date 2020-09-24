import moment from "moment";

export const DATE_PATTERN: string = "DD.MM.YY";
export const DATE_TIME_PATTERN: string = "DD.MM.YY HH:mm";

export const dateToDateString = (dateObject: Date): string => {
  const date = moment(dateObject);
  return date.format(DATE_PATTERN);
};

export const dateToDateTimeString = (dateObject: Date): string => {
  const date = moment(dateObject);
  return date.format(DATE_TIME_PATTERN);
};

export const dateToPatternDateString = (
  dateObject: Date,
  pattern: string
): string => {
  const date = moment(dateObject);
  return date.format(pattern);
};

export const dateToLocalDateString = (dateObject: Date): string => {
  const date = moment(dateObject);
  return date.format("YYYY-MM-DD");
};
