import { isSabbath } from "./mm-calendar/astro";
import { julianToMyanmarDate } from "./mm-calendar/julian-to-myanmar";
import { getMyanmarDate } from "./mm-calendar/myanmar-date";
import { westernToJulianDayNumber } from "./mm-calendar/western-to-julian";

console.log(julianToMyanmarDate(2459946))

console.log(isSabbath(new Date(2024,9,17)))