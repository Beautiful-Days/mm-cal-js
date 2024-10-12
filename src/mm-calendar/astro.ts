import { getMyanmarDate } from "./myanmar-date.js";

/**
 * Checking Astrological days
 * More details @ http://cool-emerald.blogspot.sg/2013/12/myanmar-astrological-calendar-days.html
 * Get sabbath day and sabbath eve from JS date object.
 * The API deviates from the original implementation. But, should output the same result.
 * @param date JS date object
 * @returns [1=sabbath, 2=sabbath eve, 0=else]
 */
export const isSabbath = (date: Date) => {
  const { monthLength, monthDay, myanmarYearType } = getMyanmarDate(date);
  let isSabbath = 0;
  if (
    monthDay === 8 ||
    monthDay === 15 ||
    monthDay === 23 ||
    monthDay === monthLength
  ) {
    isSabbath = 1;
  }
  if (
    monthDay === 7 ||
    monthDay === 14 ||
    monthDay === 22 ||
    monthDay === monthLength - 1
  ) {
    isSabbath = 2;
  }
  return isSabbath;
};
