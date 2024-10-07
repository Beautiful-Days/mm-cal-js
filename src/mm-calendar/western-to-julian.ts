import { GREGORIAN_START_IN_ENGLISH_CAL } from "./constants";

export enum CalendarType {
  English = 0,
  Gregorian = 1,
  Julian = 2,
}

/**
 * Western date ot Julian day number. Credit4 Gregorian 2 JD: (w2j)
 * @see https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html#jdn
 * @param date western date object
 * @param startOfGregorian start of Gregorian calendar in Julian day number (default 2361222)
 * @param calendarType calendar type (default English)
 * @returns Julian day number
 */

export const westernToJulianDayNumber = (
  date: Date,
  startOfGregorian = GREGORIAN_START_IN_ENGLISH_CAL,
  calendarType = CalendarType.English
): number => {
  // stupid JavaScript month is zero-based
  let oneBasedMonth = date.getMonth() + 1;
  let a = Math.floor((14 - oneBasedMonth) / 12);
  let year = date.getFullYear() + 4800 - a;
  let month = oneBasedMonth + 12 * a - 3;
  // Gregorian calendar starts in English calendar on 14 September 1752
  startOfGregorian =
    startOfGregorian <= 0 ? GREGORIAN_START_IN_ENGLISH_CAL : startOfGregorian;

  let julianDay =
    date.getDate() +
    Math.floor((153 * month + 2) / 5.0) +
    365 * year +
    Math.floor(year / 4.0);
  if (calendarType === CalendarType.Gregorian) {
    julianDay =
      julianDay - Math.floor(year / 100.0) + Math.floor(year / 400.0) - 32045;
  } else if (calendarType === CalendarType.Julian) {
    julianDay = julianDay - 32083;
  } else {
    julianDay =
      julianDay - Math.floor(year / 100.0) + Math.floor(year / 400.0) - 32045;
    if (julianDay < startOfGregorian) {
      julianDay =
        date.getDate() +
        Math.floor((153 * month + 2) / 5.0) +
        (365 * year )+
        Math.floor(year / 4.0) -
        32083;
      if (julianDay > startOfGregorian) {
        julianDay = startOfGregorian;
      }
    }
  }
  let fraction = getFractionOfDay(date);
  return julianDay + fraction;
};

const getFractionOfDay = (date: Date) => {
  return (
    (date.getHours() - 12) / 24 +
    date.getMinutes() / 1440 +
    date.getSeconds() / 86400
  );
};
