import { julianToMyanmarDate } from "./julian-to-myanmar.js";
import { westernToJulianDayNumber } from "./western-to-julian.js";

export const getMyanmarDate = (date: Date) => {
  return julianToMyanmarDate(westernToJulianDayNumber(date));
};
