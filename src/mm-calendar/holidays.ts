// Official public holidays of Myanmar(Burma).
/*
Algorithm for calculating the Myanmar calendar included in this file is the property of the
original creator, Dr Yan Naing Aye.
https://scholar.google.com.sg/citations?user=MOmTzIwAAAAJ&hl=en&oi=ao

References
==========

Aye, Y. N. (2013, June 15). Algorithm, program and calculation of Myanmar calendar. 
https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html

Wikipedia contributors. (2024, April 13). Public holidays in Myanmar. Wikipedia. 
https://en.wikipedia.org/wiki/Public_holidays_in_Myanmar

Julian Dates. (n.d.). https://www.celestialprogramming.com/julian.html

Commenthol. (n.d.). GitHub - commenthol/astronomia: An astronomical library. GitHub. 
https://github.com/commenthol/astronomia

*/

import { GREGORIAN_START_IN_ENGLISH_CAL } from "./constants.js";
import {
	BEGINNING_OF_THINGYAN,
	MYANMAR_ERA_START,
	SOLAR_YEAR,
	THIRD_ERA_START,
} from "./constants.js";
import { checkMyanmarYear, julianToMyanmarDate } from "./julian-to-myanmar.js";
import { CalendarType } from "./western-to-julian.js";
// --------------------------------------------------------------------
export type Holidays = {
	secularDiff(year: number): number;
	w2jdn(
		year: number,
		month: number,
		day: number,
		startOfGregorian?: number,
		calendarType?: CalendarType,
	): number;
	mpmt(
		jd: number,
		md: number,
	): {
		mmt: number;
		mp: number;
	};
	myanmarToJdn(my: number, mm: number, md: number): number;
	thingyanHolidays(jdn: number, my: number, mmt: number): string[];
	mmHolidays(year: number, month: number, date: number): string[];
	gregorianHolidays(year: number, month: number, date: number): string[];
	substituteHoliday(year: number, month: number, date: number): string[];
	eid_day(year: number, month: number, date: number): string[];
};
//----------------------------------------------------------------------
//  TODO : Eid al-Adha and Deepavali
const eidDays: number[] = [
	//2020
	2459063,
];
const substitute_holiday: number[] = [
	// 2019
	2458768, 2458772, 2458785, 2458800,
	// 2020
	2458855, 2458918, 2458950, 2459051, 2459062, 2459152, 2459156, 2459167,
	2459181, 2459184,
	// 2021
	2459300, 2459303, 2459323, 2459324, 2459335, 2459548, 2459573,
];
/**
 *Holidays observed on the Gregorian Calendar
 */
const gregorianHoliday: Map<string, (year: number) => string[]> = new Map([
	[
		"1-1",
		(year: number) => (year >= 2018 && year <= 2021 ? ["New Year's Day"] : []),
	],
	["1-4", (year: number) => (year >= 1948 ? ["Independence Day"] : [])],
	["2-12", (year: number) => (year >= 1947 ? ["Union Day"] : [])],
	["3-2", (year: number) => (year >= 1958 ? ["Peasants' Day"] : [])],
	["3-27", (year: number) => (year >= 1945 ? ["Armed Forces Day"] : [])],
	["5-1", (year: number) => (year >= 1923 ? ["Labour Day"] : [])],
	["7-19", (year: number) => (year >= 1947 ? ["Martyrs' Day"] : [])],
	["12-25", (year: number) => (year >= 1752 ? ["Christmas"] : [])],
	["12-30", (year: number) => (year === 2017 ? ["Holiday"] : [])],
	[
		"12-31",
		(year: number) => (year >= 2017 && year <= 2021 ? ["Holiday"] : []),
	],
]);
/**
 * Public Holidays observed on the Myanmar Calendar, Full Moon Days
 */
const fullMoonHolidays: Map<string, string[]> = new Map([
	// Kason Full Moon
	["2-1", ["Buddha Day"]],
	// Waso Full Moon , for leap year its 2nd Waso Full Moon
	["4-1", ["Beginning of Buddhist Lent"]],
	// Thadingyut Full Moon
	["7-1", ["End of Buddhist Lent"]],
	["8-1", ["Tazaungdaing"]],
	["12-1", ["Tabaung Pwe"]],
]);
/**
 *  Public Holidays observed on the Myanmar Calendar
 */
const otherHolidays: Map<string, (my: number) => string[]> = new Map([
	// Before End of Buddhist Lent
	["7-14", (my: number) => (my >= 1379 ? ["Holiday"] : [])],
	// After End of Buddhist Lent
	["7-16", (my: number) => (my >= 1379 ? ["Holiday"] : [])],
	["8-14", (my: number) => (my >= 1379 ? ["Holiday"] : [])],
	["8-25", (my: number) => (my >= 1282 ? ["National Day"] : [])],
	["10-1", () => ["Karen New Year's Day"]],
]);
// ---------------------------------------------------------------------------------------------------
export const holidays: Holidays = {
	/**
	 * Difference between Gregorian and Julian calendar.
	 * @param year Gregorian year
	 * @returns number of secular days difference
	 */
	secularDiff(year: number): number {
		return Math.floor(year / 100) - Math.floor(year / 400) - 2;
	},
	/**
	 * Convert Gregorian date to Julian Day Number(JDN) .
	 *  Algorithms from Astronomical Algorithms (Meeus) and taking into account secular difference
	 * @param year year
	 * @param month month [1-12]
	 * @param day date [1-31]
	 * @param startOfGregorian England and its colonies start using Gregorian  (default 2361222)
	 * @param calendarType calendar type (default English(British))
	 * @returns Julian Day Number(JDN)
	 */
	w2jdn(
		// hh:nn:ss default 12:00:00
		year: number,
		month: number,
		day: number,
		/*
        September 14, 1752 was the day that England and its American colonies 
        switched from the Julian calendar to the Gregorian calendar, dropping 11 
        days from the calendar.
        1752-Sep-02 Wednesday[JDN = 2361221] followed by 1752-Sep-14 Thursday [JDN = 2361222] on British Calendar

        October 5–14, 1582 are dates that do not exist in the calendar because of the introduction of the Gregorian calendar.

        */
		startOfGregorian = GREGORIAN_START_IN_ENGLISH_CAL,
		calendarType = CalendarType.English,
	): number {
		const d: number = holidays.secularDiff(year);
		// pre jdn
		const a: number = Math.floor((month - 3) / 12);
		const x4: number = year + a;
		const x3: number = Math.floor(x4 / 100);
		const x2: number = x4 % 100;
		const x1: number = month - 12 * a - 3;
		const _jd: number =
			Math.floor((146097 * x3) / 4) +
			Math.floor((36525 * x2) / 100) +
			Math.floor((153 * x1 + 2) / 5) +
			day +
			1721119;
		// taking into account difference between calendar types
		// adjust jdn with calendar type
		const jd: number =
			calendarType === CalendarType.Julian ||
			(calendarType === CalendarType.English && _jd < startOfGregorian)
				? _jd + d
				: _jd;

		return Math.round(jd);
	},
	/**
	 * Get Myanmar month type and moon phase from Julian Day Number and Myanmar date
	 * @param jd Julian Day Number
	 * @param md Myanmar date [1-30]
	 * @returns  Myanmar month type and moon phase
	 */
	mpmt(
		jd: number,
		md: number,
	): {
		mmt: number;
		mp: number;
	} {
		const ml = julianToMyanmarDate(jd).monthLength;
		const mmt = julianToMyanmarDate(jd).monthType;
		const mp =
			Math.floor((md + 1) / 16) + Math.floor(md / 16) + Math.floor(md / ml);
		return { mmt, mp };
	},
	/**
	 * Myanmar to Julian Day Number(JDN)
	 * @see https://cool-emerald.blogspot.com/2013/06/algorithm-program-and-calculation-of.html#:~:text=Myanmar%20Date%20to%20JDN%20Conversion
	 *
	 * @param {number} my Myanmar Year
	 * @param {number} mm Myanmar Month
	 * @param {number} md Myanmar Date
	 * @returns Julian Day Number(JDN)
	 */
	myanmarToJdn(my: number, mm: number, md: number): number {
		const { myanmarYearType, tagu1 } = checkMyanmarYear(my);
		/*
	This function/method is not standalone and part of
	a conversion process. The following mmt (Myanmar Month Type) is
	not the calculation of mmt, to determine type of mm from input mm's index
	as an implementation of this algorithm.
    */
		const mmt = Math.floor(mm / 13);
		const _mm = (mm % 13) + mmt;
		const b = myanmarYearType >> 1;
		const c = myanmarYearType === 1 || myanmarYearType === 2 ? 0 : 1;
		const _mm2 =
			_mm + 4 - Math.floor((_mm + 15) / 16) * 4 + Math.floor((_mm + 12) / 16);
		const _dd =
			md +
			Math.floor(29.544 * _mm2 - 29.26) -
			c * Math.floor((_mm2 + 11) / 16) * 30 +
			b * Math.floor((_mm2 + 12) / 16);
		const myl = 354 + (1 - c) * 30 + b;
		const dd = _dd + mmt * myl;
		return dd + tagu1 - 1;
	},

	/**
	 * Myanmar Thingyan Holidays
	 * @param jdn Julian Day Number
	 * @param my Myanmar Year
	 * @param mmt Myanmar Month Type
	 * @returns Thingyan Holidays
	 */
	thingyanHolidays(jdn: number, my: number, mmt: number) {
		const y = my + mmt;
		const atatTime = SOLAR_YEAR * y + MYANMAR_ERA_START;
		const akyaTime =
			my >= THIRD_ERA_START ? atatTime - 2.169918982 : atatTime - 2.1675;
		const atatNay = Math.round(atatTime);
		const akyaNay = Math.round(akyaTime);
		const hs: string[] = [];
		if (jdn === atatNay + 1) {
			hs.push("Myanmar New Year's Day");
		}
		if (y >= BEGINNING_OF_THINGYAN) {
			if (jdn === atatNay) {
				hs.push("Thingyan Atat");
			} else if (jdn > akyaNay && jdn < atatNay) {
				hs.push("Thingyan Akyat");
			} else if (jdn === akyaNay) {
				hs.push("Thingyan Akya");
			} else if (jdn === akyaNay - 1) {
				hs.push("Thingyan Akyo");
			}
		}
		// Extra Thingyan Holidays
		// 2007 to 2016
		if (
			y >= 1369 &&
			y <= 1379 &&
			(jdn === akyaNay - 2 || (jdn >= atatNay + 2 && jdn <= akyaNay + 7))
		)
			hs.push("Thingyan Holiday");
		// 2022 and 2023
		if (
			y >= 1384 &&
			y <= 1385 &&
			(jdn === akyaNay - 5 ||
				jdn === akyaNay - 4 ||
				jdn === akyaNay - 3 ||
				jdn === akyaNay - 2)
		)
			hs.push("Thingyan Holiday");
		// 2024 =>
		if (y >= 1386 && jdn >= atatNay + 2 && jdn <= akyaNay + 7)
			hs.push("Thingyan Holiday");

		// TODO : check for extra holidays for thingyan
		return hs;
	},
	/**
	 * Myanmar Holidays
	 * @param {number} year Gregorian Year
	 * @param {number} month Gregorian Month [1-12]
	 * @param {number} date Gregorian Date [1-31]
	 * @returns {string[]} Holidays in English
	 */
	mmHolidays(year: number, month: number, date: number): string[] {
		const jdn = holidays.w2jdn(year, month, date);
		const yo = julianToMyanmarDate(jdn);
		const my = yo.myanmarYear;
		const mm = yo.month;
		const md = yo.monthDay;
		const { mmt, mp } = holidays.mpmt(jdn, md);
		const key_1 = `${mm}-${mp}`;
		const key_2 = `${mm}-${md}`;
		const hs_1 = fullMoonHolidays.get(key_1) || [];
		const hs_2 = otherHolidays.get(key_2)?.(my) || [];
		const hs_3 = holidays.thingyanHolidays(jdn, my, mmt);
		return [...hs_1, ...hs_2, ...hs_3];
	},
	/**
	 * Public holidays that related to Gregorian Calendar
	 * @param {number} year Gregorian Year
	 * @param {number} month Gregorian Month [1-12]
	 * @param {number} date Gregorian Date [1-31]
	 * @returns {string[]} Holidays in English
	 */
	gregorianHolidays(year: number, month: number, date: number): string[] {
		const key = `${month}-${date}`;
		return gregorianHoliday.get(key)?.(year) || [];
	},
	/**
	 * Substitute holidays
	 * @param {number} year Gregorian Year
	 * @param {number} month Gregorian Month [1-12]
	 * @param {number} date Gregorian Date [1-31]
	 * @returns {string[]} Holidays in English
	 */
	substituteHoliday(year: number, month: number, date: number): string[] {
		const jdn = holidays.w2jdn(year, month, date);
		return substitute_holiday.includes(jdn) ? ["Holiday"] : [];
	},
	/**
	 * Eid al-Adha day
	 * @param {number} year Gregorian Year
	 * @param {number} month Gregorian Month [1-12]
	 * @param {number} date Gregorian Date [1-31]
	 * @returns {string[]} Holidays in English
	 */
	eid_day(year: number, month: number, date: number): string[] {
		const jdn = holidays.w2jdn(year, month, date);
		return eidDays.includes(jdn) ? ["Eid al-Adha"] : [];
	},
};

/**
 * Public Holidays of Myanmar
 * @param {Date} date JS Date Object
 * @returns {string[]} Array of public holidays in English
 *
 * @example
 *
 * ```ts
 * import { publicHolidays } from "mm-cal-js";
 *
 * console.log(publicHolidays(new Date(2000, 0, 4)));
 *
 * ```
 */
export function publicHolidays(date: Date): string[] {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hs_1 = holidays.mmHolidays(year, month, day);
	const hs_2 = holidays.gregorianHolidays(year, month, day);
	const hs_3 = holidays.substituteHoliday(year, month, day);
	const hs_4 = holidays.eid_day(year, month, day);

	return [...hs_1, ...hs_2, ...hs_3, ...hs_4];
}
