export const setTimeUnitDate = (array: any[]): string => {
  const arrayLength = array.length;

  let timeFrequency = "day";

  if (arrayLength > 40) {
    timeFrequency = "week";
  }

  if (arrayLength > 140) {
    timeFrequency = "month";
  }

  if (arrayLength > 1600) {
    timeFrequency = "year";
  }

  return timeFrequency;
};
