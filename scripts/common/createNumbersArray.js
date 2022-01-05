export const createNumbersArray = (from, to) => {
  const INCLUDES_THE_LAST_ELEMENT = 1;
  const rangeDifference = to - from + INCLUDES_THE_LAST_ELEMENT;

  return Array.from(new Array(rangeDifference), (val, index) => index + from);
};
