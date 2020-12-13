import moment from "moment";

export const dateToDateString = (dateObject: Date): string => {
  const date = moment(dateObject);
  return date.format("L");
};

export const dateToDateTimeString = (dateObject: Date): string => {
  const date = moment(dateObject);
  return date.format("L HH:mm");
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

export const dateToApiDateString = (dateObject: Date): string => {
  let date = moment.utc(dateObject);
  return date.format("YYYY-MM-DD");
};

export const dateToApiDateTimeString = (dateObject: Date): string => {
  let date = moment.utc(dateObject);
  return date.format("YYYY-MM-DDTHH:mm");
};

export const toDaysAgo = (date: Date): String => {
  const daysAgo = moment().diff(moment(date), "days");
  if (daysAgo === 0) {
    return "today";
  }
  if (daysAgo === 1) {
    return "1 day ago";
  }
  return `${daysAgo} days ago`;
};
