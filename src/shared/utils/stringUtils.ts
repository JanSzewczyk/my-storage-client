import _ from "lodash";

export const nullIfEmpty = (value: string): string | null =>
  !_.isEmpty(value) ? value : null;

export const emptyStringIfNull = (value: string | null): string =>
  _.isNull(value) ? "" : value;
