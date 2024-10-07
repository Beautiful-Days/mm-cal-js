import { LUNAR_MONTH, MYANMAR_ERA_START, SOLAR_YEAR } from "./constants";
import { getMyanmarConstants } from "./myanmar-year-constants";

/**
 * Julian day number to Myanmar date
 * @param julianDay : julian day number
 * @returns myanmarYearType = year type [0=common, 1=little watat, 2=big watat]
 * @returns month = [
 * Tagu=1, Kason=2, Nayon=3, 1st Waso=0, 2nd Waso=4,
 * Wagaung=5, Tawthalin=6, Thadingyut=7, Tazaungmon=8,
 * Nadaw=9, Pyatho=10, Tabodwe=11, Tabaung=12,
 * Late Tagu=13, Late Kason=14]
 * @returns monthType = [0=Hnaung, 1=Oo]
 * @returns monthLength = [29 or 30 days]
 * @returns monthDay = [1 to 30]
 * @returns fortnightDay = [1 to 15]
 * @returns moonPhase = [0=waxing, 1=full moon, 2=waning, 3=new moon]
 * @returns weekDay = [0=sat, 1=sun, 2=mon, 3=tue, 4=wed, 5=thu, 6=fri]
 */
export const julianToMyanmarDate = (julianDay: number) => {
  // convert jd to jdn
  // jdn
  let julianDayNumber = Math.round(julianDay);
  // myear
  let myanmarYear = Math.floor(
    (julianDayNumber - 0.5 - MYANMAR_ERA_START) / SOLAR_YEAR
  );
  // check year
  let yo = checkMyanmarYear(myanmarYear);
  // dd
  let dayCount = julianDayNumber - yo.tagu1 + 1;
  let b =Math.floor( yo.myanmarYearType / 2);
  // big wa and common year
  let c = Math.floor(1 / (yo.myanmarYearType + 1));
  // year length
  let yearLength = 354 + (1 - c) * 30 + b;
  // month type: Hnaung = 1 or Oo = 0 | late = 1 or early = 0
  let monthType = Math.floor((dayCount -1)/yearLength);
  dayCount -= monthType * yearLength;
  // adjust day count and threshold
  let a = Math.floor((dayCount + 423) / 512);
  // month
  let month = Math.floor((dayCount - b * a + c * a * 30 + 29.26) / 29.544);
  let e =Math.floor( (month + 12) / 16);
  let f = Math.floor((month + 11) / 16);
  // day of month
  let monthDay =
    dayCount - Math.floor(29.544 * month - 29.26) - b * e + c * f * 30;
    
  // adjust month numbers for late months
  month += f * 3 - e * 4 + 12 * monthType;
  let monthLength = 30 - (month % 2);

  if (month === 3) {
    // adjust if Nayon in big watat
    monthLength += yo.myanmarYearType / 2;
  }
  // moon phase from day of the month, month, and year type
  // [0=waxing, 1=full moon, 2=waning, 3=new moon]
  let moonPhase = (monthDay + 1) / 16 + monthDay / 16 + monthDay / monthLength;

  // fortnight day from month day
  // waxing or waning day
  let fortnightDay = monthDay - 15 * (monthDay / 16);
  // week day
  let weekDay = (julianDayNumber + 2) % 7;
  return {
    myanmarYear,
    myanmarYearType: yo.myanmarYearType,
    yearLength,
    month,
    monthType,
    monthLength,
    monthDay,
    moonPhase,
    fortnightDay,
    weekDay,
    julianDay,
  };
};

/**
 * Check watat (intercalary month) (chk_watat)
 * @param myanmarYear Myanmar year
 * @returns watat = intercalary month [1=watat, 0=common]
 * @returns fm = full moon day of 2nd Waso in jdn_mm (jdn+6.5 for MMT) [only valid when watat=1]
 */
export const checkWatat = (myanmarYear: number) => {
  // get constants for the corresponding calendar era
  let myanmarConstants = getMyanmarConstants(myanmarYear);
  // threshold to adjust
  let threshold =
    (SOLAR_YEAR / 12 - LUNAR_MONTH) * (12 - myanmarConstants.NUMBER_OF_MONTHS);
  // excess day
  let excessDays = (SOLAR_YEAR * (myanmarYear + 3739)) % LUNAR_MONTH;

  if (excessDays < threshold) {
    // adjust excess days
    excessDays += LUNAR_MONTH;
  }
  // full moon day of 2nd Waso
  let fullMoon = Math.round(
    SOLAR_YEAR * myanmarYear +
      MYANMAR_ERA_START -
      excessDays +
      4.5 * LUNAR_MONTH +
      myanmarConstants.WATAT_OFFSET
  );
  let watat = 0;
  // find watat
  if (myanmarConstants.ERA_ID >= 2) {
    // if 2nd era or later, find watat based on excess days
    let tw =
      LUNAR_MONTH -
      (SOLAR_YEAR / 12 - LUNAR_MONTH) * myanmarConstants.NUMBER_OF_MONTHS;
    if (excessDays >= tw) {
      watat = 1;
    }
  } else {
    // if 1st era, find watat by 19 years metonic cycle
    // Myanmar year is divided by 19 and there is an intercalary month
    // if the remainder is 2, 5, 7, 10, 13, 15, 18
    // https://github.com/kanasimi/CeJS/blob/master/data/date/calendar.js#L2330
    watat = (myanmarYear * 7 + 2) % 19;
    if (watat < 0) {
      watat += 19;
    }
    watat = Math.floor(watat / 12.0);
  }
  // correct watat exceptions
  watat ^= myanmarConstants.EXCEPTION_IN_WATAT_YEAR;
  return {
    fullMoon, // fm
    watat, // watat
  };
};

/**
 * Check Myanamr year (chk_my)
 * depenency: chk_watat(my)
 * @param myanmarYear Myanmar year
 * @returns map
 * myanmarYearType = year type [0=common, 1=little watat, 2=big watat] (myt)
 * tagu1 = the 1st day of Tagu as Julian Day Number (Julian Day Number for MMT) tg1
 * fullMoon = full moon day of [2nd] Waso as Julian Day Number (fm)
 * watatError = [0=ok, 1=error] (werr)
 */
export const checkMyanmarYear = (myanmarYear: number) => {
  let y2 = checkWatat(myanmarYear);
  let myanmarYearType = y2!.watat;

  let yd = 0;
  let y1:
    | {
        fullMoon: number;
        watat: number;
      }
    | undefined = undefined;

  do {
    yd++;
    y1 = checkWatat(myanmarYear - yd);
  } while (y1!.watat === 0 && yd < 3);

  let fullMoon: number = 0;
  let watatError = 0;

  if (myanmarYearType) {
    let nd = (y2!.fullMoon - y1!.fullMoon) % 354;
    myanmarYearType = Math.floor(nd / 31) + 1;
    fullMoon = y2!.fullMoon;
    console.log("1", fullMoon);
    if (nd != 30 && nd != 31) {
      watatError = 1;
    }
  } else {
    fullMoon = y1!.fullMoon + 354 * yd;
    console.log("2", fullMoon);
  }

  let tagu1 = y1!.fullMoon + 354 * yd - 102;
  return {
    myanmarYearType, // myt
    tagu1, // tg1
    fullMoon: fullMoon, // fm
    watatError, // werr
  };
};
