import { julianToMyanmarDate } from "./julian-to-myanmar";
import { westernToJulianDayNumber } from "./western-to-julian";

export const getMyanmarDate = (date: Date) => {
  return julianToMyanmarDate(westernToJulianDayNumber(date));
};
